'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">
                        <img alt="" class="img-responsive" data-type="custom-logo" src=images/rds-newlogo-transparent.png>
                    </a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Escribe para buscar"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Comenzando</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Descripción general
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>Léeme
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencias
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Módulos</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' : 'data-target="#xs-components-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' :
                                            'id="xs-components-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' }>
                                            <li class="link">
                                                <a href="components/AddUserGroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AddUserGroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminWellcomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminWellcomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersDomainComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersDomainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersGroupsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersGroupsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UsersTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersTableComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' : 'data-target="#xs-injectables-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' :
                                        'id="xs-injectables-links-module-AdminModule-4cfe7bf8cd855be3b00c42c5105a5c20"' }>
                                        <li class="link">
                                            <a href="injectables/AdminApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AdminFireService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminFireService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GroupDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GroupEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GroupsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GroupsService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDomainDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDomainDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDomainEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDomainEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link" >AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AnnouncementsModule.html" data-type="entity-link" >AnnouncementsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' : 'data-target="#xs-components-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' :
                                            'id="xs-components-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' }>
                                            <li class="link">
                                                <a href="components/AnnouncementDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnnouncementResultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementResultComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseAnnouncementsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseAnnouncementsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' : 'data-target="#xs-injectables-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' :
                                        'id="xs-injectables-links-module-AnnouncementsModule-92a994c1f332c991a4fe3f918ab3c3b9"' }>
                                        <li class="link">
                                            <a href="injectables/AnnouncementDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnnouncementEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AnnouncementsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnnouncementsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AnnouncementsRoutingModule.html" data-type="entity-link" >AnnouncementsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-a4ac2a36aec38b66f5c2783b8876a029"' : 'data-target="#xs-components-links-module-AppModule-a4ac2a36aec38b66f5c2783b8876a029"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-a4ac2a36aec38b66f5c2783b8876a029"' :
                                            'id="xs-components-links-module-AppModule-a4ac2a36aec38b66f5c2783b8876a029"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-1"' : 'data-target="#xs-components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-1"' :
                                            'id="xs-components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-1"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-1.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-2"' : 'data-target="#xs-components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-2"' :
                                            'id="xs-components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-2"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-2.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-3"' : 'data-target="#xs-components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-3"' :
                                            'id="xs-components-links-module-AppModule-ed657d56c28ab8e9e0f32ad46470dc94-3"' }>
                                            <li class="link">
                                                <a href="components/AppComponent-3.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppStoreModule.html" data-type="entity-link" >AppStoreModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppStoreModule-ae656089d4c13f21647f9aad7bb6beb3"' : 'data-target="#xs-injectables-links-module-AppStoreModule-ae656089d4c13f21647f9aad7bb6beb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppStoreModule-ae656089d4c13f21647f9aad7bb6beb3"' :
                                        'id="xs-injectables-links-module-AppStoreModule-ae656089d4c13f21647f9aad7bb6beb3"' }>
                                        <li class="link">
                                            <a href="injectables/NgrxToastService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NgrxToastService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-9fa679cb36bdfb0525f52b4530573d13"' : 'data-target="#xs-components-links-module-AuthModule-9fa679cb36bdfb0525f52b4530573d13"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-9fa679cb36bdfb0525f52b4530573d13"' :
                                            'id="xs-components-links-module-AuthModule-9fa679cb36bdfb0525f52b4530573d13"' }>
                                            <li class="link">
                                                <a href="components/LoginDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClassroomModule.html" data-type="entity-link" >ClassroomModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' : 'data-target="#xs-components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' :
                                            'id="xs-components-links-module-ClassroomModule-5d0ac77b36c9d62a08eb0359e3cd07d0"' }>
                                            <li class="link">
                                                <a href="components/ClassroomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ClassroomComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ClassroomRoutingModule.html" data-type="entity-link" >ClassroomRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' : 'data-target="#xs-components-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' :
                                            'id="xs-components-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainContentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainContentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidenavComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidenavComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' : 'data-target="#xs-injectables-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' :
                                        'id="xs-injectables-links-module-CoreModule-d2a2e33a14cbbd8c6ff5cfcbaa2610b2"' }>
                                        <li class="link">
                                            <a href="injectables/LayoutService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ThemeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ThemeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesModule.html" data-type="entity-link" >CoursesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' : 'data-target="#xs-components-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' :
                                            'id="xs-components-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' }>
                                            <li class="link">
                                                <a href="components/CourseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CourseUserDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseUserDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CoursesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CoursesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' : 'data-target="#xs-injectables-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' :
                                        'id="xs-injectables-links-module-CoursesModule-b5472e2335c2592fd8a7c605fad7ff57"' }>
                                        <li class="link">
                                            <a href="injectables/CourseDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CoursesRoutingModule.html" data-type="entity-link" >CoursesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CourseWorksModule.html" data-type="entity-link" >CourseWorksModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' : 'data-target="#xs-components-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' :
                                            'id="xs-components-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' }>
                                            <li class="link">
                                                <a href="components/CourseWorkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorkComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' : 'data-target="#xs-injectables-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' :
                                        'id="xs-injectables-links-module-CourseWorksModule-e3d13b71188ef2030e0b5da40bf89c77"' }>
                                        <li class="link">
                                            <a href="injectables/CourseWorkDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorkDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseWorkEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorkEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseWorksService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseWorksService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentSubmissionDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSubmissionDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentSubmissionEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentSubmissionEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TopicEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopicEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CourseWorksRoutingModule.html" data-type="entity-link" >CourseWorksRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GradesModule.html" data-type="entity-link" >GradesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' : 'data-target="#xs-components-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' :
                                            'id="xs-components-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' }>
                                            <li class="link">
                                                <a href="components/GradeCourseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradeCourseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradesWellcomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradesWellcomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectCourseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SelectCourseComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' : 'data-target="#xs-injectables-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' :
                                        'id="xs-injectables-links-module-GradesModule-b143cde1f5527536834d7b851726f9a1"' }>
                                        <li class="link">
                                            <a href="injectables/CourseDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CoursesService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeacherDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeacherEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeachersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GradesRoutingModule.html" data-type="entity-link" >GradesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' : 'data-target="#xs-directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directivas</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' :
                                        'id="xs-directives-links-module-MaterialModule-ea0f9fc7853b4699bd46a93985a63397"' }>
                                        <li class="link">
                                            <a href="directives/MaterialElevationDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MaterialElevationDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ParallaxDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParallaxDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomsModule.html" data-type="entity-link" >RoomsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' : 'data-target="#xs-components-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' :
                                            'id="xs-components-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' }>
                                            <li class="link">
                                                <a href="components/RoomComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoomCourseDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomCourseDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoomDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RoomsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserRoomDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserRoomDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' : 'data-target="#xs-injectables-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' :
                                        'id="xs-injectables-links-module-RoomsModule-6240b0bc0eca5eb9b58ad6ed701d4eb1"' }>
                                        <li class="link">
                                            <a href="injectables/RoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RoomsRoutingModule.html" data-type="entity-link" >RoomsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolModule.html" data-type="entity-link" >SchoolModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' : 'data-target="#xs-components-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' :
                                            'id="xs-components-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' }>
                                            <li class="link">
                                                <a href="components/AssigmentsDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssigmentsDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AssignmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AssignmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NewCicleDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewCicleDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveUserConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveUserConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SaveUserErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SaveUserErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolStudentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolStudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolTeachersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolTeachersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SchoolUsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolUsersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeachersFormComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersFormComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' : 'data-target="#xs-injectables-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' :
                                        'id="xs-injectables-links-module-SchoolModule-3bd35e8cba1ad1098419b45d06ece4e0"' }>
                                        <li class="link">
                                            <a href="injectables/AdminApiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminApiService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRoomDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRoomEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomCourseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomCourseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDomainDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDomainDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDomainEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDomainEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SchoolRoutingModule.html" data-type="entity-link" >SchoolRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' : 'data-target="#xs-components-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' :
                                            'id="xs-components-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' }>
                                            <li class="link">
                                                <a href="components/AboutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AboutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnimatedTextComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnimatedTextComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BreadcrumbComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodeConductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CodeConductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodeConductSchoolComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CodeConductSchoolComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConfirmDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfirmDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeleteButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LicenseComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LicenseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LocationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoAnimateComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoAnimateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LogoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LogoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParallaxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParallaxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ParallaxSpaceComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ParallaxSpaceComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyPolicyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacyPolicyComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RemoteLearningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoteLearningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RemoveConfirmComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RemoveConfirmComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReopenningComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReopenningComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnackComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SnackbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TermsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TermsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UnderConstructionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UnderConstructionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WellcomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WellcomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/YoutubeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >YoutubeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' : 'data-target="#xs-injectables-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' :
                                        'id="xs-injectables-links-module-SharedModule-d8aae3a61d6579e6bb5bd4811b37315d"' }>
                                        <li class="link">
                                            <a href="injectables/SeoService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SeoService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SnackService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SnackbarService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SnackbarService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SubscriptionService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubscriptionService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentsModule.html" data-type="entity-link" >StudentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' : 'data-target="#xs-components-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' :
                                            'id="xs-components-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' }>
                                            <li class="link">
                                                <a href="components/CourseStudentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseStudentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GuardiansListDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuardiansListDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' : 'data-target="#xs-injectables-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' :
                                        'id="xs-injectables-links-module-StudentsModule-d7402a08ded6635d095c8f217f03a6c3"' }>
                                        <li class="link">
                                            <a href="injectables/StudentDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentsRoutingModule.html" data-type="entity-link" >StudentsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SubjectsModule.html" data-type="entity-link" >SubjectsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' : 'data-target="#xs-components-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' :
                                            'id="xs-components-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' }>
                                            <li class="link">
                                                <a href="components/CourseRoomsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubjectDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubjectDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' : 'data-target="#xs-injectables-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' :
                                        'id="xs-injectables-links-module-SubjectsModule-415a73e4309aa643fa51698f61e204f9"' }>
                                        <li class="link">
                                            <a href="injectables/CourseRoomDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRoomEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomCourseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomCourseService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubjectsRoutingModule.html" data-type="entity-link" >SubjectsRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeachersModule.html" data-type="entity-link" >TeachersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' : 'data-target="#xs-components-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' :
                                            'id="xs-components-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' }>
                                            <li class="link">
                                                <a href="components/ScoresEditComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ScoresEditComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeacherCoursesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherCoursesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeachersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeachersDashboardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersDashboardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeachersGradeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersGradeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' : 'data-target="#xs-injectables-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' :
                                        'id="xs-injectables-links-module-TeachersModule-8fe87656ee489df2a68e94cbca266a62"' }>
                                        <li class="link">
                                            <a href="injectables/CourseRoomDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/CourseRoomEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseRoomEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomCourseService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomCourseService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RoomService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoomService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeachersCoursesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersCoursesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeachersModule.html" data-type="entity-link" >TeachersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' : 'data-target="#xs-components-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' :
                                            'id="xs-components-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' }>
                                            <li class="link">
                                                <a href="components/CourseTeachersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CourseTeachersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' : 'data-target="#xs-injectables-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' :
                                        'id="xs-injectables-links-module-TeachersModule-5ee478110bf91ad93a9acdad4581f8a7-1"' }>
                                        <li class="link">
                                            <a href="injectables/TeacherDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeacherEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeacherEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TeachersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TeachersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TeachersRoutingModule.html" data-type="entity-link" >TeachersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/TeachersRoutingModule.html" data-type="entity-link" >TeachersRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' : 'data-target="#xs-components-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' :
                                            'id="xs-components-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' }>
                                            <li class="link">
                                                <a href="components/GradeRecomendationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradeRecomendationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradesBarChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradesBarChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradesListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradesListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GradesTableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradesTableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGradesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserGradesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserGradesPrintableComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserGradesPrintableComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserHomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserHomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserMenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserMenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WorkingOnGradesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WorkingOnGradesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' : 'data-target="#xs-injectables-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' :
                                        'id="xs-injectables-links-module-UserModule-fd3cc5bf1da566b0c98b55a6ab470a0f"' }>
                                        <li class="link">
                                            <a href="injectables/SchoolService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SchoolService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserEntityService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserProfilesModule.html" data-type="entity-link" >UserProfilesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' : 'data-target="#xs-components-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Componentes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' :
                                            'id="xs-components-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' }>
                                            <li class="link">
                                                <a href="components/EditProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' : 'data-target="#xs-injectables-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Inyectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' :
                                        'id="xs-injectables-links-module-UserProfilesModule-a53f308bb49a73b22719dada5864789f"' }>
                                        <li class="link">
                                            <a href="injectables/GuardianDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuardianDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GuardianEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuardianEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileDataService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileDataService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfileEntityService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfileEntityService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserProfilesService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserProfilesService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserProfilesRoutingModule.html" data-type="entity-link" >UserProfilesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link" >UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Componentes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdminCoursesComponent.html" data-type="entity-link" >AdminCoursesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginDialogComponent.html" data-type="entity-link" >LoginDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NotesEditComponent.html" data-type="entity-link" >NotesEditComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Clases</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AssignGrade.html" data-type="entity-link" >AssignGrade</a>
                            </li>
                            <li class="link">
                                <a href="classes/FirestoreGenericService.html" data-type="entity-link" >FirestoreGenericService</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScoreDataSource.html" data-type="entity-link" >ScoreDataSource</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Inyectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminApiService.html" data-type="entity-link" >AdminApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AdminFireService.html" data-type="entity-link" >AdminFireService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnnouncementDataService.html" data-type="entity-link" >AnnouncementDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnnouncementEntityService.html" data-type="entity-link" >AnnouncementEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppEffects.html" data-type="entity-link" >AppEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthEffects.html" data-type="entity-link" >AuthEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthFireService.html" data-type="entity-link" >AuthFireService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseDataService.html" data-type="entity-link" >CourseDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseEntityService.html" data-type="entity-link" >CourseEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseRoomDataService.html" data-type="entity-link" >CourseRoomDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseRoomService.html" data-type="entity-link" >CourseRoomService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseWorkDataService.html" data-type="entity-link" >CourseWorkDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CourseWorkEntityService.html" data-type="entity-link" >CourseWorkEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DialogEffects.html" data-type="entity-link" >DialogEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FireEffects.html" data-type="entity-link" >FireEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FirestoreService.html" data-type="entity-link" >FirestoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupsService.html" data-type="entity-link" >GroupsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuardianDataService.html" data-type="entity-link" >GuardianDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuardianEntityService.html" data-type="entity-link" >GuardianEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link" >LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RouteEffects.html" data-type="entity-link" >RouteEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SeoService.html" data-type="entity-link" >SeoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackbarService.html" data-type="entity-link" >SnackbarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackEffects.html" data-type="entity-link" >SnackEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SnackService.html" data-type="entity-link" >SnackService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SpinnerEffects.html" data-type="entity-link" >SpinnerEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentDataService.html" data-type="entity-link" >StudentDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentEntityService.html" data-type="entity-link" >StudentEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentsService.html" data-type="entity-link" >StudentsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentSubmissionDataService.html" data-type="entity-link" >StudentSubmissionDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentSubmissionEntityService.html" data-type="entity-link" >StudentSubmissionEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubscriptionService.html" data-type="entity-link" >SubscriptionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherDataService.html" data-type="entity-link" >TeacherDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeacherEntityService.html" data-type="entity-link" >TeacherEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ThemeService.html" data-type="entity-link" >ThemeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TopicDataService.html" data-type="entity-link" >TopicDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TopicEntityService.html" data-type="entity-link" >TopicEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserDataService.html" data-type="entity-link" >UserDataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEntityService.html" data-type="entity-link" >UserEntityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserProfileEffects.html" data-type="entity-link" >UserProfileEffects</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guardias</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AdminsCoursesResolver.html" data-type="entity-link" >AdminsCoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AnnouncementResolver.html" data-type="entity-link" >AnnouncementResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/CourseResolver.html" data-type="entity-link" >CourseResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CourseRoomResolver.html" data-type="entity-link" >CourseRoomResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CoursesGradeResolver.html" data-type="entity-link" >CoursesGradeResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CoursesResolver.html" data-type="entity-link" >CoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/CourseWorksResolver.html" data-type="entity-link" >CourseWorksResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GroupsResolver.html" data-type="entity-link" >GroupsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/GuardiansResolver.html" data-type="entity-link" >GuardiansResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/SchoolUsersResolver.html" data-type="entity-link" >SchoolUsersResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentCoursesResolver.html" data-type="entity-link" >StudentCoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentsGradeResolver.html" data-type="entity-link" >StudentsGradeResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentsResolver.html" data-type="entity-link" >StudentsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/StudentSubmissionsResolver.html" data-type="entity-link" >StudentSubmissionsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TeachersCoursesResolver.html" data-type="entity-link" >TeachersCoursesResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TeachersGuard.html" data-type="entity-link" >TeachersGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/TeachersResolver.html" data-type="entity-link" >TeachersResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/TopicsResolver.html" data-type="entity-link" >TopicsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserDomainsResolver.html" data-type="entity-link" >UserDomainsResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserProfileResolver.html" data-type="entity-link" >UserProfileResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserResolver.html" data-type="entity-link" >UserResolver</a>
                            </li>
                            <li class="link">
                                <a href="guards/UsersResolver.html" data-type="entity-link" >UsersResolver</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Assigment.html" data-type="entity-link" >Assigment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthenticationState.html" data-type="entity-link" >AuthenticationState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseMaterial.html" data-type="entity-link" >CourseMaterial</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseMaterialSet.html" data-type="entity-link" >CourseMaterialSet</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CourseRoom.html" data-type="entity-link" >CourseRoom</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Date.html" data-type="entity-link" >Date</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveFile.html" data-type="entity-link" >DriveFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DriveFolder.html" data-type="entity-link" >DriveFolder</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Entity.html" data-type="entity-link" >Entity</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ExampleFlatNode.html" data-type="entity-link" >ExampleFlatNode</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Form.html" data-type="entity-link" >Form</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GlobalPermissions.html" data-type="entity-link" >GlobalPermissions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Grade.html" data-type="entity-link" >Grade</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GradeHistory.html" data-type="entity-link" >GradeHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Group.html" data-type="entity-link" >Group</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GroupResponse.html" data-type="entity-link" >GroupResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IBreadCrumb.html" data-type="entity-link" >IBreadCrumb</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFirestoreService.html" data-type="entity-link" >IFirestoreService</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Link.html" data-type="entity-link" >Link</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Material.html" data-type="entity-link" >Material</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ModifyIndividualStudentsOptions.html" data-type="entity-link" >ModifyIndividualStudentsOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Name.html" data-type="entity-link" >Name</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NavLink.html" data-type="entity-link" >NavLink</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Parent.html" data-type="entity-link" >Parent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RoleSelectorId.html" data-type="entity-link" >RoleSelectorId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Room.html" data-type="entity-link" >Room</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Score.html" data-type="entity-link" >Score</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SharedDriveFile.html" data-type="entity-link" >SharedDriveFile</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StateHistory.html" data-type="entity-link" >StateHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudentGrade.html" data-type="entity-link" >StudentGrade</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudentSubmission.html" data-type="entity-link" >StudentSubmission</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SubmissionHistory.html" data-type="entity-link" >SubmissionHistory</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserAuth.html" data-type="entity-link" >UserAuth</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserDomain.html" data-type="entity-link" >UserDomain</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserName.html" data-type="entity-link" >UserName</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserParent.html" data-type="entity-link" >UserParent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPhoto.html" data-type="entity-link" >UserPhoto</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserResponse.html" data-type="entity-link" >UserResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserScore.html" data-type="entity-link" >UserScore</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserStudent.html" data-type="entity-link" >UserStudent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserStudent-1.html" data-type="entity-link" >UserStudent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserTeacher.html" data-type="entity-link" >UserTeacher</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserTeacher-1.html" data-type="entity-link" >UserTeacher</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/YouTubeVideo.html" data-type="entity-link" >YouTubeVideo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscelánea</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Funciones</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Rutas</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Cobertura de la documentación</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});