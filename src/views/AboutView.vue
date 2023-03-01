<template>
  <div>
    <button @click="sendMessage({ text: 'Hello' })">Send message</button>
  </div>
</template>

<script>
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

export default {};
/*
import gql from "graphql-tag";
export default {
  apollo: {
    // Simple query that will update the 'hello' vue property
    hello: gql`
      {
        constants {
          heroes {
            id
            stats {
              primaryAttribute
            }
          }
        }
      }
    `,
  },
};
*/
</script>
