### Frontend:

|  Page   | Path  |
|  ----  | ----  |
| MainMusic  | /pages/MainMusic |
| LoginDialog  | /pages/LoginDialog |
| RegisterDialog  | /pages/register|
| SearchPage | /pages/search/:keyword |
| PlaylistPage  | /pages/playlist/:id/:type |
| MvPage | /pages/mv/:id/:type |
| IndividualProfile | /pages/Profile |
| Redirect: MainPage  | /pages/Profile |

<br>

### Backend:

|Function|Route|
|  ----  | ----  |
|Post: login|/api/login|
|Post: register	|/api/register|
|Post: image upload|	/api/image|
|Post: create a music playlist	|/api/playlist|
|Put: edit individual profile	|/api/editprofile|
|Put: update musiclist|	/api/playlist/musiclist|	
|Delete: delete user account|	/api/editprofile/:id|
|Delete: delete a musiclist	|/api/playlist/musiclist/:id|
|Delete: delete a song|	/api/playlist/songs|
|Get: get recommend user musiclist list	|/api/playlist/shuffedlist|
|Get: get the user musiclist information	|/api/playlist/singlelist/:id|

<br>
	
### Back to [Readme](/README.md)

