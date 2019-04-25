
# Welcome to githubapp!

## STRUCTURE

- Modules 
  - header component
  - main page component
  - menu (navigation) componnet
  - page not found component
  - users components
    - users list component
    - user details component
  - repos components
    - repos list component
    - repo details component
- Shared
  - components
    - loader
    - messages 
  - enums
  - models
  - services
    - authentication interceptor
    - data storage service
    - loader service
    - messages service
    - global error handler

## External libraries
 - https://getbootstrap.com/
 - https://www.primefaces.org/primeng/#/ - controale custom

## IMPORTANT NOTICE
  To make requests in a secure and a continuos method, you must generate a token that will be send on each request

  For editing a repo, you must be the owner of that repo and you must have access rights in the specified token

## Header component
  This component contains the title of the aplication

## Main page component
  This component contains a short description of the aplication

## Menu component
  This component contains the navigation links

## PageNotFound component
  This component contains a default html that is display when the users enters an unknown url

## Users components
  This section contains the master component (userslist) and the details component (userdetails). When a user is clicked, a new tab is opened in browser with the selected user information

## Repos components
  This section contains the master component (reposlist) and the details component (repodetails). When a repo is clicked, in the right side apears a region with the details to be edited. 

  PartialRepoDetailsService manages the selected repo that is currently in editing mode. The repo is stored in a sessionstorage variable to mantain the data that is edited but not saved when changing url's.

## Shared loader component
  Is a component that displays a loading icon when the request takes longer.

## Shared messages component
  This component is used when you want to send notification to the user. A popup is display with a specific type (ERROR, WARNING, SUCCESS).

  A PrimeNG component is used for the popup

## Authentication interceptor
  A token is sent with each request. The initial request is cloned and a token is added.

## DataStorage service
  A service that manages the GitHub API requests

## GlobalError handler
  A custom error handler that displays a message (message component) to the user when any unhandled error is catched.

## Loader service
  A service that notifies the loader component when to be shown in interface

## Messages service
  A service that notifies the messages componnet when to be shown in interface
