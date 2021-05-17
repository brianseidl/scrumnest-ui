import { mount } from 'enzyme';

import Nests from './Nests';

const data =
  [
    {
      "nestId": "106105844747683199",
      "name": "Arsenal",
      "createdAt": "2021-04-21T23:11:43.202300+00:00",
      "owner": "qique",
      "stories": [
        {
          "nestId": "106105844747683199",
          "storyId": "106105896324015897",
          "title": "test2",
          "description": "Testing testing read all about it",
          "createdAt": "2021-04-21T23:24:50.119441+00:00",
          "dateToBeCompleted": "2021-05-16T00:00:00+00:00",
          "owner": "adelphiEmail",
          "status": "TODO",
          "priority": "MEDIUM",
          "effort": 2
        },
        {
          "nestId": "106105844747683199",
          "storyId": "106126935750609477",
          "title": "Testing testing",
          "description": null,
          "createdAt": "2021-04-25T16:29:59.812731+00:00",
          "dateToBeCompleted": null,
          "owner": "adelphiEmail",
          "status": "TODO",
          "priority": "NONE",
          "effort": null
        },
        {
          "nestId": "106105844747683199",
          "storyId": "106128870986945377",
          "title": "New user story",
          "description": "Testing",
          "createdAt": "2021-04-26T00:45:20.021774+00:00",
          "dateToBeCompleted": "2021-05-15T00:00:00+00:00",
          "owner": "qique",
          "status": "TODO",
          "priority": "URGENT",
          "effort": null
        },
        {
          "nestId": "106105844747683199",
          "storyId": "106239133887504421",
          "title": "Another story for test",
          "description": null,
          "createdAt": "2021-05-15T11:58:21.060711+00:00",
          "dateToBeCompleted": null,
          "owner": "qique",
          "status": "TODO",
          "priority": "NONE",
          "effort": null
        }
      ],
      "users": [
        {
          "username": "qique",
          "email": "gambra7@gmail.com"
        },
        {
          "username": "adelphiEmail",
          "email": "enriquegambra@mail.adelphi.edu"
        },
        {
          "username": "",
          "email": "jennybeans286@gmail.com"
        }
      ]
    },
    {
      "nestId": "106135445474824625",
      "name": "Brand New Nest",
      "createdAt": "2021-04-27T04:39:34.191717+00:00",
      "owner": "qique",
      "stories": [],
      "users": []
    },
    {
      "nestId": "106127088063781097",
      "name": "{dialogTitle=test}",
      "createdAt": "2021-04-25T17:10:39.138537+00:00",
      "owner": "qique",
      "stories": [],
      "users": [
        {
          "username": "qique",
          "email": "gambra7@gmail.com"
        }
      ]
    },
  ]

function setup() {
  const nestsComp = mount(<Nests />);
  nestsComp.setState({ nests: data });
  return nestsComp;
}

it('should render a list of nests with the correct table values', () => {
  const nestsComp = setup();

  for (const nest of data) {
    const row = nestsComp.find({ id: `#${nest.nestId}` });
    expect(row).toBeTruthy();

    expect(nestsComp.text().includes(nest.nestId)).toBeTruthy();
    expect(nestsComp.text().includes(nest.name)).toBeTruthy();
    expect(nestsComp.text().includes(nest.owner)).toBeTruthy();
    expect(nestsComp.text().includes(nest.users.length)).toBeTruthy();
    expect(nestsComp.text().includes(new Date(nest.createdAt).toLocaleString())).toBeTruthy();
  }
});

// TO-DO: Add test cases for graphql API's
