export class Videocard
{
    cardID : Number;
    title : string;
    description : string;
    imageUrl : string;
    ytLink : string;
    videoType : string[];
}
/*
cardId -> unique id for any videocard
title -> title for that videocard
description -> something about that video
imageUrl -> image is in assets and the particular url of that image thatis used in this video card
            (can change this attribute if we go for different aproach for images)
ytLink -> youtube link of that particulr video
videoType -> array of string in which we may have multiple type like ["featured","video of the day","Top Viewed","Chef's Special"]
*/