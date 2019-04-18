
<?xml version="1.0" encoding="UTF-8" ?>
    <document>
        <catalogTemplate>
            <head>
                <style>
                .expiresSoon {
                color: rgba(255, 0, 0, 1.0);
                    tv-highlight-color: rgba(255, 20, 20, 1.0);
                }
                .expiresLater {
                color: rgba(0, 0, 0, 1.0);
                }
                </style>
            </head>
            <banner>
                <title>Movies</title>
                <monogramLockup>
                    <monogram src="https://homepages.cae.wisc.edu/~ece533/images/peppers.png"/>
                    <title>peppers</title>
                    <subtitle>Vegetable</subtitle>
                </monogramLockup>
            </banner>
            <list>
                <section>
                <listItemLockup>
                    <title>Videos</title>
                    <relatedContent>
                    <grid>
                    <prototypes>
                    <lockup prototype="public" URL ="@src:{URL};">

                    <img binding="@src:{img};" width="200" height="200"/>
                    <placeholder tag="title"/>
                    </lockup>
                    </prototypes>
                    <section binding="items:{images};"/>
                    </grid>
                    </relatedContent>
                    </listItemLockup>
                </section>
            </list>
        </catalogTemplate>
    </document>
