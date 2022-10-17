/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BitbucketIntegration } from '@backstage/integration';
import {
  CatalogProcessorResult,
  processingResult,
} from '@backstage/plugin-catalog-backend';
import { Logger } from 'winston';

/**
 * A custom callback that reacts to finding a repository by yielding processing
 * results.
 *
 * @public
 * @deprecated Please migrate to `@backstage/plugin-catalog-backend-module-bitbucket-cloud` or `@backstage/plugin-catalog-backend-module-bitbucket-server` instead.
 */
export type BitbucketRepositoryParser = (options: {
  integration: BitbucketIntegration;
  target: string;
  presence?: 'optional' | 'required';
  logger: Logger;
}) => AsyncIterable<CatalogProcessorResult>;

export const defaultRepositoryParser =
  async function* defaultRepositoryParser(options: {
    target: string;
    presence?: 'optional' | 'required';
  }) {
    yield processingResult.location({
      type: 'url',
      target: options.target,
      // Not all locations may actually exist, since the user defined them as a wildcard pattern.
      // Thus, we emit them as optional and let the downstream processor find them while not outputting
      // an error if it couldn't.
      presence: options.presence ?? 'optional',
    });
  };
