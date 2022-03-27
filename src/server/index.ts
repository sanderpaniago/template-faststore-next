/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/rules-of-hooks */
import 'setimmediate'

import {
  envelop,
  useExtendContext,
  useMaskedErrors,
  useSchema,
} from '@envelop/core'
import type { FormatErrorHandler } from '@envelop/core'
import { useGraphQlJit } from '@envelop/graphql-jit'
import { useParserCache } from '@envelop/parser-cache'
import { useValidationCache } from '@envelop/validation-cache'
import { getContextFactory, getSchema } from '@faststore/api'
import { GraphQLError } from 'graphql'
import type { Options as APIOptions } from '@faststore/api'
import { mergeSchemas } from '@graphql-tools/schema'
import type { ExecutionResult } from 'graphql'

import type { ExecuteOptions } from './types/index'
import persisted from '../../@generated/graphql/persisted.json'
import storeConfig from '../../store.config'

const persistedQueries = new Map(Object.entries(persisted))

const apiOptions = {
  platform: storeConfig.platform as APIOptions['platform'],
  account: storeConfig.api.storeId,
  environment: storeConfig.api.environment as APIOptions['environment'],
  channel: storeConfig.channel,
  hideUnavailableItems: true,
}

const apiSchema = getSchema(apiOptions)
const apiContextFactory = getContextFactory(apiOptions)

export const getMergedSchema = async () => {
  return mergeSchemas({
    schemas: [await apiSchema],
  })
}

const isBadRequestError = (err: GraphQLError) => {
  return err.originalError && err.originalError.name === 'BadRequestError'
}

const formatError: FormatErrorHandler = (err) => {
  console.error(err)

  if (err instanceof GraphQLError && isBadRequestError(err)) {
    return err
  }

  return new GraphQLError('Sorry, something went wrong.')
}

const getEnvelop = async () =>
  envelop({
    plugins: [
      useSchema(await getMergedSchema()),
      useExtendContext(apiContextFactory),
      useMaskedErrors({ formatError }),
      useGraphQlJit(),
      useValidationCache(),
      useParserCache(),
    ],
  })

const envelopPromise = getEnvelop()

export async function execute<QueryType, VariablesType>(
  options: ExecuteOptions<VariablesType>,
  envelopContext = {}
) {
  const { operationName, variables, query: maybeQuery } = options
  const query = maybeQuery ?? persistedQueries.get(operationName)

  if (query == null) {
    throw new Error(`No query found for operationName: ${operationName}`)
  }

  const enveloped = await envelopPromise
  const {
    parse,
    contextFactory,
    execute: run,
    schema,
  } = enveloped(envelopContext)

  return run({
    schema,
    document: parse(query),
    variableValues: variables,
    contextValue: await contextFactory({}),
    operationName,
  }) as Promise<ExecutionResult<QueryType>>
}
