import { DirectiveLocation, type IntrospectionQuery } from 'graphql';

export const testGraphQLSchema: IntrospectionQuery = {
  __schema: {
    types: [
      {
        kind: 'OBJECT',
        name: 'Test_object_1',
        description: null,
        fields: [
          {
            name: 'Test_object_field_1',
            description: null,
            args: [
              {
                name: 'Test_object_field_arg_1',
                description: null,
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'INPUT_OBJECT',
                    name: 'CreateAlbumInput',
                  },
                },
                defaultValue: null,
              },
              {
                name: 'Test_object_field_arg_2',
                description: null,
                type: {
                  kind: 'NON_NULL',
                  ofType: {
                    kind: 'INPUT_OBJECT',
                    name: 'CreateAlbumInput',
                  },
                },
                defaultValue: null,
              },
            ],
            type: {
              kind: 'SCALAR',
              name: 'Test_object_field_type',
            },
            isDeprecated: false,
            deprecationReason: null,
          },
        ],
        interfaces: [],
      },
      {
        kind: 'INPUT_OBJECT',
        name: 'Test_input_object_1',
        description: null,
        inputFields: [
          {
            name: 'Test_input_object_title',
            description: null,
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'String',
              },
            },
            defaultValue: null,
          },
          {
            name: 'Test_input_object_id',
            description: null,
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'ID',
              },
            },
            defaultValue: null,
          },
        ],
        isOneOf: false,
      },
      {
        kind: 'ENUM',
        name: 'Test_enum_1',
        description: null,
        enumValues: [
          {
            name: 'Test_enum_value_1',
            description: null,
            isDeprecated: false,
            deprecationReason: null,
          },
          {
            name: 'Test_enum_value_2',
            description: null,
            isDeprecated: false,
            deprecationReason: null,
          },
        ],
      },
    ],
    queryType: {
      name: 'Query',
      kind: 'OBJECT',
    },
    mutationType: {
      name: 'Mutation',
      kind: 'OBJECT',
    },
    subscriptionType: null,
    directives: [
      {
        name: 'include',
        description: 'Directs the executor to include this field or fragment only when the `if` argument is true.',
        locations: [DirectiveLocation.FIELD, DirectiveLocation.FRAGMENT_SPREAD, DirectiveLocation.INLINE_FRAGMENT],
        args: [
          {
            name: 'if',
            description: 'Included when true.',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Boolean',
              },
            },
            defaultValue: null,
          },
        ],
      },
    ],
  },
};
