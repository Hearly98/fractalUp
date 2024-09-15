import { gql } from 'apollo-angular';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      emojiU
      continent {
        name
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query GetContinent {
    continents {
      name
    }
  }
`;
const GET_COUNTRY_BY_CODE = gql`
  query GetCountryByCode($code: ID!) {
    country(code: $code) {
      name
      continent {
        name
      }
      capital
      currencies
      emojiU
      languages {
        name
      }
      states {
        name
      }
      subdivisions {
        name
      }
    }
  }
`;
export { GET_COUNTRIES, GET_CONTINENTS, GET_COUNTRY_BY_CODE };
