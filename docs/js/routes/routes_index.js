var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","component":"LayoutComponent","data":{"breadcrumb":"Home"},"children":[{"path":"","component":"HomeComponent","data":{"breadcrumb":null}},{"path":"profesores","loadChildren":"./teachers/teachers.module#TeachersModule","canActivate":["TeachersGuard"],"data":{"breadcrumb":"Profesores"}},{"path":"escuela","loadChildren":"@rds-school/school.module#SchoolModule","canActivate":["AdminGuard"],"data":{"breadcrumb":"Administración"},"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/school/school-routing.module.ts","module":"SchoolRoutingModule","children":[{"path":"","component":"SchoolComponent","data":{"breadcrumb":null},"children":[{"path":"","component":"SchoolDashboardComponent","data":{"breadcrumb":null}},{"path":"usuarios","component":"SchoolUsersComponent","data":{"breadcrumb":"Usuarios"},"resolve":{"users":"SchoolUsersResolver"}},{"path":"usuarios/:id","component":"SchoolUserComponent","data":{"breadcrumb":":id"}},{"path":"grupos","loadChildren":"../rooms/rooms.module#RoomsModule","canActivate":["AdminGuard"],"data":{"breadcrumb":"Asignaciones"},"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/rooms/rooms-routing.module.ts","module":"RoomsRoutingModule","children":[{"path":"","component":"RoomsComponent","resolve":{"courses":"CourseRoomResolver","users":"SchoolUsersResolver"}}],"kind":"module"}],"module":"RoomsModule"}]},{"path":"materias","loadChildren":"../subjects/subjects.module#SubjectsModule","canActivate":["AdminGuard"],"data":{"breadcrumb":"Materias"},"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/subjects/subjects-routing.module.ts","module":"SubjectsRoutingModule","children":[{"path":"","component":"CourseRoomsComponent","resolve":{"courses":"CourseRoomResolver","users":"SchoolUsersResolver"}}],"kind":"module"}],"module":"SubjectsModule"}]}]}],"kind":"module"}],"module":"SchoolModule"}]},{"path":"gsuite","loadChildren":"@rds-classroom/classroom.module#ClassroomModule","canActivate":["AuthGuard"],"data":{"breadcrumb":"GoogleGSuite"},"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/classroom/classroom-routing.module.ts","module":"ClassroomRoutingModule","children":[{"path":"","component":"ClassroomComponent","data":{"breadcrumb":null}},{"path":"clases","loadChildren":"./courses/courses.module#CoursesModule","data":{"breadcrumb":null}}],"kind":"module"}],"module":"ClassroomModule"}]},{"path":"perfil","loadChildren":"@rds-classroom/user-profiles/user-profiles.module#UserProfilesModule","canActivate":["AuthGuard"]},{"path":"calificaciones","loadChildren":"./grades/grades.module#GradesModule","canActivate":["AdminGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/grades/grades-routing.module.ts","module":"GradesRoutingModule","children":[{"path":"","component":"GradesComponent","children":[{"path":"","component":"GradesWellcomeComponent"},{"path":"student","component":"GradeCourseComponent"}]}],"kind":"module"}],"module":"GradesModule"}]},{"path":"user","loadChildren":"@rds-user/user.module#UserModule","canActivate":["AuthGuard"],"data":{"breadcrumb":"Serviciosescolares"},"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/user/user-routing.module.ts","module":"UserRoutingModule","children":[{"path":"","component":"UserComponent","resolve":{"user":"UserResolver"},"children":[{"path":"","component":"UserHomeComponent"},{"path":"info","component":"UserInfoComponent"},{"path":"grades_soon","component":"WorkingOnGradesComponent"},{"path":"grades","component":"UserGradesComponent","data":{"breadcrumb":"Calificaciones"}}]}],"kind":"module"}],"module":"UserModule"}]},{"path":"admin","loadChildren":"@rds-admin/admin.module#AdminModule","canActivate":["AdminGuard"],"children":[{"kind":"module","children":[{"name":"routes","filename":"projects/classroom-rds/src/app/admin/admin-routing.module.ts","module":"AdminRoutingModule","children":[{"path":"","component":"AdminComponent","children":[{"path":"","component":"AdminWellcomeComponent"},{"path":"users","component":"UsersDomainComponent","resolve":{"users":"UserDomainsResolver"}},{"path":"school-home","component":"SchoolHomeComponent","resolve":{"users":"UserDomainsResolver"}},{"path":"users/:userId","component":"UserDetailsComponent"},{"path":"groups","component":"GroupsComponent","resolve":{"groups":"GroupsResolver"}},{"path":"users-in-groups","component":"UsersGroupsComponent","resolve":{"users":"UserDomainsResolver"}}]}],"kind":"module"}],"module":"AdminModule"}]},{"path":"youtube","component":"YoutubeComponent"},{"path":"about","component":"AboutComponent","data":{"breadcrumb":"¿Quiénessomos?"}},{"path":"reopenning","component":"ReopenningComponent","data":{"breadcrumb":"Reapertura"}},{"path":"remote-learning","component":"RemoteLearningComponent","data":{"breadcrumb":"Educaciónadistancia"}},{"path":"privacy-policy","component":"PrivacyPolicyComponent","data":{"breadcrumb":"Políticasdeprivacidad"}},{"path":"not-found","component":"NotFoundComponent"},{"path":"location","component":"LocationComponent","data":{"breadcrumb":"¿Dóndeestamos?"}},{"path":"license","component":"LicenseComponent"},{"path":"code-conduct","component":"CodeConductComponent","data":{"breadcrumb":"Códigodeconducta"}},{"path":"code-conduct-school","component":"CodeConductSchoolComponent"},{"path":"terms","component":"TermsComponent","data":{"breadcrumb":"¿Quiénessomos?"}},{"path":"under-construction","component":"UnderConstructionComponent"},{"path":"settings","component":"SettingsComponent","canActivate":["AuthGuard"],"data":{"breadcrumb":"Configuración"}},{"path":"**","component":"NotFoundComponent"}]}],"kind":"module"}]}
