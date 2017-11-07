/*

URL: https://us17.api.mailchimp.com/3.0

GET    /template-folders
GET    /template-folders/{folder-id}
POST   /template-folders
{
    name: String (Folder name)
}

PATCH  /template-folders/{folder-id}
{
    name: String (Folder name)
}

DELETE /template-folders/{folder-id}


GET    /templates
GET    /templates/{template-id}
POST   /templates
{
    name: String (Template Name)
    folder_id: String (Folder ID, optional)
    html: String (Template HTML)
}

PATCH  /templates/{template-id}
{
    name: String (Template Name)
    folder_id: String (Folder ID, optional)
    html: String (Template HTML)
}

DELETE /templates/{template-id}

 */