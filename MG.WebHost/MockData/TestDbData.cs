using MG.WebHost.Database;
using MG.WebHost.Entities;
using MG.WebHost.Entities.Emails;
using MG.WebHost.Entities.Enums;
using MG.WebHost.Entities.Images;
using MG.WebHost.Entities.Sections;
using MG.WebHost.Entities.Tournaments;
using MG.WebHost.Entities.Users;

namespace MG.WebHost.MockData
{
    public static class TestDbData
    {
        public static void Initialize(MgContext context)
        {
            var locations = InitializeLocations(context);
            var sections = InitializeSections(context, locations);
            var masters = InitializeMasters(context, sections);
            var timetableRecords = InitializeTimetableRecords(context, masters, sections, locations);
            var emailTemplates = InitializeEmailTemplates(context);
            var students = InitializeStudents(context);
            var tournaments = InitializeTournaments(context, students);
            var users = InitializeUsers(context);
        }

        private static IEnumerable<User> InitializeUsers(MgContext context)
        {
            var users = new List<User>
            {
                new(
                    firstName: "Руслан",
                    lastName: "Хомутенко",
                    middleName: "Николаевич")
                {
                    Id = Guid.Parse("8F256A33-E2BA-4FE1-860B-67947CDADAD8"),
                    UserTypes = UserType.Admin
                }
            };

            context.Users.AddRange(users);
            context.SaveChanges();

            return users;
        }

        private static IEnumerable<Tournament> InitializeTournaments(MgContext context, IEnumerable<User> students)
        {
            var days = 0;

            var tournaments = new List<Tournament>();
            Enumerable.Repeat(() =>
            {
                tournaments.Add(
                    new Tournament(name: "29th Karate Grand Prix Croatia")
                    {
                        Address = "Sambor/Croatia", GoogleMapLink = "https://goo.gl/maps/XsDLKcLXamGB9tdt8", ActionDate = DateTime.UtcNow.AddDays(-++days), Participants = "-", Results = new List<TournamentResult>
                        {
                            new() { User = students.First(), Place = "1", Awards = "Золотая медаль", Score = "5:3", AdditionalInfo = "Дополнительная информация" },
                            new() { User = students.Skip(1).First(), Place = "2", Awards = "Серебряная медаль", Score = "3:5", AdditionalInfo = "Дополнительная информация" },
                            new() { User = students.Last(), Place = "3", Awards = "Бронзовая медаль", Score = "2:6", AdditionalInfo = "Дополнительная информация" },
                        }
                    }
                );
            }, 10).ToList().ForEach(e => e());
            
            context.Tournaments.AddRange(tournaments);
            context.SaveChanges();

            return tournaments;
        }

        private static IEnumerable<User> InitializeStudents(MgContext context)
        {
            var students = new List<User>
            {
                new(firstName: "Иван", lastName: "Иванов", middleName: "Иванович") { UserTypes = UserType.Student },
                new("Александр", "Жуков", "Владимирович") {UserTypes = UserType.Student },
                new("Никита", "Добрыня", "Александрович") { UserTypes = UserType.Student },
            };
            
            context.Users.AddRange(students);
            context.SaveChanges();

            return students;
        }

        private static List<EmailTemplate> InitializeEmailTemplates(MgContext context)
        {
            var emailTemplates = new List<EmailTemplate>
            {
                new () {Name = EmailTemplateKey.AdminRegistration.ToString(), Value = "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>New registration</title> </head> <body> <h1>User has just registered!</h1> <p>User data:</p> <p>First name: {{user.firstName}}</p> <p>Last name: {{user.lastName}}</p> <p>Birthday: {{user.birthday}}</p> <p>Phone: <a href=\"tel:{{user.phone}}\">{{user.phoneNumber}}</a></p> <p>Email: <a href=\"mailto:{{user.email}}\">{{user.email}}</a></p> <p>The same email: <a href=\"mailto:{{user.email}}\">{{user.email}}</a></p> </body> </html>"},
                new () {Name = EmailTemplateKey.UserRegistrationResponse.ToString(), Value = "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>New registration</title></head><body><h1>{{user.firstName}}, Our record was registered!</h1><p>Wait for call from administrator!</p><p>See you soon!</p></body></html>"},
            };
            
            context.EmailTemplates.AddRange(emailTemplates);

            context.SaveChanges();

            return emailTemplates;
        }

        private static List<TimetableRecord> InitializeTimetableRecords(MgContext context, List<User> masters, List<Section> sections, Location[] locations)
        {
            var section1 = sections[0];
            var section2 = sections[1];
            var section3 = sections[2];

            var master1 = masters[0];
            var master2 = masters[1];
            var master3 = masters[2];

            var timetableRecords = new List<TimetableRecord>();
            
            foreach (var location in locations)
            {
                timetableRecords.AddRange(new TimetableRecord[]
                {
                    // ----> master1
                
                    new() { Master = master1, Section = section1, DayOfWeek = DayOfWeek.Monday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master1, Section = section1, DayOfWeek = DayOfWeek.Wednesday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master1, Section = section1, DayOfWeek = DayOfWeek.Friday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    
                    new() { Master = master1, Section = section2, DayOfWeek = DayOfWeek.Tuesday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master1, Section = section2, DayOfWeek = DayOfWeek.Thursday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master1, Section = section2, DayOfWeek = DayOfWeek.Saturday, StartTime = "18:00", EndTime = "19:00", Location = location},

                    new() { Master = master1, Section = section3, DayOfWeek = DayOfWeek.Tuesday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master1, Section = section3, DayOfWeek = DayOfWeek.Thursday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master1, Section = section3, DayOfWeek = DayOfWeek.Saturday, StartTime = "14:00", EndTime = "15:00", Location = location},

                    // ----> master2
                    
                    new() { Master = master2, Section = section1, DayOfWeek = DayOfWeek.Tuesday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master2, Section = section1, DayOfWeek = DayOfWeek.Thursday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master2, Section = section1, DayOfWeek = DayOfWeek.Sunday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    
                    new() { Master = master2, Section = section2, DayOfWeek = DayOfWeek.Monday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master2, Section = section2, DayOfWeek = DayOfWeek.Wednesday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master2, Section = section2, DayOfWeek = DayOfWeek.Friday, StartTime = "14:00", EndTime = "15:00", Location = location},

                    new() { Master = master2, Section = section3, DayOfWeek = DayOfWeek.Monday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master2, Section = section3, DayOfWeek = DayOfWeek.Wednesday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master2, Section = section3, DayOfWeek = DayOfWeek.Friday, StartTime = "14:00", EndTime = "15:00", Location = location},

                    // ----> master2
                    
                    new() { Master = master3, Section = section1, DayOfWeek = DayOfWeek.Monday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master3, Section = section1, DayOfWeek = DayOfWeek.Tuesday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    new() { Master = master3, Section = section1, DayOfWeek = DayOfWeek.Wednesday, StartTime = "18:00", EndTime = "19:00", Location = location},
                    
                    new() { Master = master3, Section = section2, DayOfWeek = DayOfWeek.Monday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master3, Section = section2, DayOfWeek = DayOfWeek.Tuesday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master3, Section = section2, DayOfWeek = DayOfWeek.Wednesday, StartTime = "14:00", EndTime = "15:00", Location = location},

                    new() { Master = master3, Section = section3, DayOfWeek = DayOfWeek.Monday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master3, Section = section3, DayOfWeek = DayOfWeek.Tuesday, StartTime = "14:00", EndTime = "15:00", Location = location},
                    new() { Master = master3, Section = section3, DayOfWeek = DayOfWeek.Wednesday, StartTime = "14:00", EndTime = "15:00", Location = location},

                });
            }
            
            context.TimetableRecords.AddRange(timetableRecords);
            context.SaveChanges();

            return timetableRecords;
        }

        private static List<User> InitializeMasters(MgContext context, List<Section> sections)
        {
            var images = new List<Image>
            {
                new()
                {
                    Id = Guid.Parse("bbf76a2e-1949-41a8-8f4b-7574207b4442"),
                    PhysicalImageSubPath = "Masters",
                    Extension = ".png"
                },
                new()
                {
                    Id = Guid.Parse("12b57b36-e781-4463-89f7-eaa3b063065b"),
                    PhysicalImageSubPath = "Masters",
                    Extension = ".png"
                },
                new()
                {
                    Id = Guid.Parse("d6fb834b-454d-42e4-98c6-92916a85d654"),
                    PhysicalImageSubPath = "Masters",
                    Extension = ".png"
                },
                new()
                {
                    Id = Guid.Parse("c21c070c-57e6-417b-8be7-ce66bfdca7c1"),
                    PhysicalImageSubPath = "Masters",
                    Extension = ".png"
                },
                new()
                {
                    Id = Guid.Parse("3eedd769-1a3c-423f-9091-d73a29e7056e"),
                    PhysicalImageSubPath = "Masters",
                    Extension = ".png"
                }
            };
            
            context.Images.AddRange(images);
            
            var masters = new List<User>
            {
                new(firstName: "Евгения", 
                    lastName: "Волощенко",
                    middleName: "Константиновна")
                {
                    UserTypes = UserType.Master,
                    Profiles = new List<UserProfile>
                    {
                        new()
                        {
                            Name = UserProfileKeys.CardMasterAchievements,
                            Value = "<p>Кандидат в Мастера спорта Украины</p><p>Чемпионка Украины по каратэ</p><p>Призер Международных турниров</p>",
                            DataType = DataType.Html
                        },
                        new()
                        {
                            Name = UserProfileKeys.CardMasterAvatarImage,
                            Value = "assets/img/masters/master-4.png",
                            DataType = DataType.Image
                        },
                        new()
                        {
                            Name = UserProfileKeys.MasterDescriptions,
                            Value = "<h1>Общая информация</h1> <hr> <p>Родился 28 августа 1976г.</p> <p>Начало занятий – октябрь 1991 года</p> <p>Первый тренер – Негатуров А.В.</p> <ul> <li>Черный пояс 3 Дан WSKF, JKA-WF</li> <li>Accredited coach WKF</li> <li>Тренер Высшей категории</li> <li>Мастер спорта международного класса по каратэ</li> <li>Судья Национальной категории</li> </ul> <h1>Образование</h1> <hr> <ol> <li>Одесский государственный экономический Университет</li> <li>Южно-украинский государственный педагогический университет (специализация: физическая культура и спорт)</li> </ol> <h1>Спортивные достижения</h1> <hr> <ul> <li>7-кратный чемпион Украины (WKF, JKA, WSKF)</li> <li>6-кратный обладатель Кубка Украины</li> <li>Чемпион Востоной Европы (WSKF)</li> <li>Обладатель Кубка Мира 2000, 2003, 2004, 2005 годов</li> <li>Обладатель Кубка Мира 2000, 2003 годов по полноконтактным поединкам</li> <li>Бронзовый призер Чемпионата Восточной Европы</li> <li>1996г. сдал экзамен на 1 Дан мастеру Хитоши Касуя (9 Дан, Япония)</li> <li>1999г. сдал экзамен на 2 Дан мастеру Хитоши Касуя (9 Дан, Япония)</li> <li>2006г. сдал экзамен на 3 Дан мастеру Хитоши Касуя (9 Дан, Япония)</li> <li>2000 и 2001годы – два года подряд награждается премией одесского областного управлением по делам физической культуры и спорта «СПОРСТМЕН ГОДА» (в неолимпийских видах спорта)</li> <li>Лауреат Муниципальной премии СПОРТСМЕН ГОДА</li> <li>«Лучший в боевых искусствах» 2000 год</li> <li>Лауреат премии «СПОРТСМЕН ГОДА» Федерации каратэ Украины 2004 год</li> </ul>",
                            DataType = DataType.Html
                        },
                        new()
                        {
                            Name = UserProfileKeys.MasterProfileImage,
                            Value = "bbf76a2e-1949-41a8-8f4b-7574207b4442",
                            DataType = DataType.Image
                        },
                        new()
                        {
                            Name = UserProfileKeys.MasterWithImages,
                            Value = "[\"12b57b36-e781-4463-89f7-eaa3b063065b\", \"d6fb834b-454d-42e4-98c6-92916a85d654\", \"c21c070c-57e6-417b-8be7-ce66bfdca7c1\", \"3eedd769-1a3c-423f-9091-d73a29e7056e\"]",
                            DataType = DataType.Array
                        }
                    }
                },
                new(
                    firstName: "Амиран", 
                    lastName: "Цискарадзе",
                    middleName: "Автандилович")
                {
                    UserTypes = UserType.Master,
                    Profiles = new List<UserProfile>
                    {
                        new()
                        {
                            Name = UserProfileKeys.CardMasterAchievements,
                            Value = "<p>Кандидат в Мастера спорта Украины</p><p>Чемпионка Украины по каратэ</p><p>Призер Международных турниров</p>",
                            DataType = DataType.Html
                        },
                        new()
                        {
                            Name = UserProfileKeys.CardMasterAvatarImage,
                            Value = "assets/img/masters/master-2.png",
                            DataType = DataType.Image
                        }
                    }
                },
                new(
                    firstName: "Иван", 
                    lastName: "Иванов",
                    middleName: "Иванович")
                {
                    UserTypes = UserType.Master,
                    Profiles = new List<UserProfile>
                    {
                        new()
                        {
                            Name = UserProfileKeys.CardMasterAchievements,
                            Value = "<p>Кандидат в Мастера спорта Украины</p><p>Чемпионка Украины по каратэ</p><p>Призер Международных турниров</p>",
                            DataType = DataType.Html
                        },
                        new()
                        {
                            Name = UserProfileKeys.CardMasterAvatarImage,
                            Value = "assets/img/masters/master-2.png",
                            DataType = DataType.Image
                        }
                    }
                }
            };
            
            context.Users.AddRange(masters);
            context.SaveChanges();
            
            return masters;
        }

        private static List<Section> InitializeSections(MgContext context, Location[] locations)
        {
            var sections = new List<Section>
            {
                new()
                {
                    Name = "Каратэ",
                    Locations = locations,
                    Settings = new List<SectionSetting>
                    {
                        new(){Name = SectionSettingKeys.CardHeader, Value = @"<h1 class=""uk-text-center"">{name}</h1>", DataType = DataType.Html},
                        new(){Name = SectionSettingKeys.CardDescription, Value = @"<ul><li>физическая подготовка;</li><li>традиционное каратэ, стиль шотокан;</li><ul><li>кихон - базовая техника</li><li>кумитэ - спарринг</li><li>ката - комплекс упражнений</li><li>этика. философия</li></ul><li>каратэ для самообороны;</li><li>соревнования различных уровней;</li><li>аттестация на пояса;</li></ul>", DataType = DataType.Html},
                        new(){Name = SectionSettingKeys.CardOrder, Value = @"1", DataType = DataType.Number},
                        new(){Name = SectionSettingKeys.CardColumn, Value = @"1", DataType = DataType.Number},
                    }
                },
                new ()
                {
                    Name = "ММА",
                    Locations = locations,
                    Settings = new List<SectionSetting>
                    {
                        new(){Name = SectionSettingKeys.CardHeader, Value = @"<h3>{name}</h3>", DataType = DataType.Html},
                        new(){Name = SectionSettingKeys.CardDescription, Value = @"<ul><li>основы ММА;</li><li>соревнования различных уровней;</li><li>обучение техникам самообороны;</li></ul>", DataType = DataType.Html},
                        new(){Name = SectionSettingKeys.CardOrder, Value = @"2", DataType = DataType.Number},
                        new(){Name = SectionSettingKeys.CardColumn, Value = @"2", DataType = DataType.Number},

                    }
                },
                new ()
                {
                    Name = "Другое",
                    Locations = locations,
                    Settings = new List<SectionSetting>
                    {
                        new(){Name = SectionSettingKeys.CardHeader, Value = @"<h3>{name}</h3>", DataType = DataType.Html},
                        new(){Name = SectionSettingKeys.CardDescription, Value = @"<ul><li>йога, основы, все позиции;</li><li>срастяжка для детей;</li><li>одетская хореография, фитнес;</li></ul>", DataType = DataType.Html},
                        new(){Name = SectionSettingKeys.CardOrder, Value = @"3", DataType = DataType.Number},
                        new(){Name = SectionSettingKeys.CardColumn, Value = @"2", DataType = DataType.Number},

                    }
                }
            };

            context.Sections.AddRange(sections);
            context.SaveChanges();
            
            return sections;
        }

        private static Location[] InitializeLocations(MgContext context)
        {
            var locations = new[]
            {
                // -----> Odessa
                
                new Location
                {
                    Address = "г. Одесса. улица Градоначальницкая1 (бывшая Перекопской Победы) (открыт в 2000 году)",
                    City = "Одесса",
                    Name = "Центр - Молдаванка",
                    GoogleMapsLink = "https://goo.gl/maps/rrPupJsxHgZSuvCr5"
                },
                new Location
                {
                    Address = "г. Одесса улица Композитора Нищинского, дом 38 (открыт в 2015 году)",
                    City = "Одесса",
                    Name = "Центр - Молдаванка",
                    GoogleMapsLink = "https://goo.gl/maps/rrPupJsxHgZSuvCr5"
                },
                new Location
                {
                    Address = "г. Одесса, улица Ивана и Юрия Липы, 13 (открыт в 2020 году)",
                    City = "Одесса",
                    Name = "Черемушки",
                    GoogleMapsLink = "https://goo.gl/maps/uZyDyRWxCGRpDDu47"
                },
                new Location
                {
                    Address = @"г.Одесса, улица Ильфа и Петрова 25 (с\ш №55)",
                    City = "Одесса",
                    Name = "Таирово",
                    GoogleMapsLink = "https://goo.gl/maps/fMv4acZGwNYVfLxr7"
                },
                
                // -----> Kiev
                
                new Location
                {
                    Address = "г. Одесса. улица Градоначальницкая1 (бывшая Перекопской Победы) (открыт в 2000 году)",
                    City = "Киев",
                    Name = "Центр - Молдаванка",
                    GoogleMapsLink = "https://goo.gl/maps/rrPupJsxHgZSuvCr5"
                },
                new Location
                {
                    Address = "г. Одесса. улица Градоначальницкая1 (бывшая Перекопской Победы) (открыт в 2000 году)",
                    City = "Киев",
                    Name = "Центр - Молдаванка",
                    GoogleMapsLink = "https://goo.gl/maps/rrPupJsxHgZSuvCr5"
                },
                
                // -----> Kharkiv
                
                new Location
                {
                    Address = "г. Одесса. улица Градоначальницкая1 (бывшая Перекопской Победы) (открыт в 2000 году)",
                    City = "Харьков",
                    Name = "Центр - Молдаванка",
                    GoogleMapsLink = "https://goo.gl/maps/rrPupJsxHgZSuvCr5"
                },
                new Location
                {
                    Address = "г. Одесса. улица Градоначальницкая1 (бывшая Перекопской Победы) (открыт в 2000 году)",
                    City = "Харьков",
                    Name = "Центр - Молдаванка",
                    GoogleMapsLink = "https://goo.gl/maps/rrPupJsxHgZSuvCr5"
                }

            };
            
            context.Locations.AddRange(locations);
            context.SaveChanges();

            return locations;
        }
    }
}