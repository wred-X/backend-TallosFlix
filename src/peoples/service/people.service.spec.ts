import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { People } from '../shared/people';
import { PeopleService } from './people.service';

const people: People[] = [
  {
    image: {
      height: 400,
      url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
      width: 265,
    },
    name: 'Paul Walker',
    birthDate: '1973-09-12',
    birthPlace: 'Glendale, California, USA',
    deathDate: '2013-11-30',
    gender: 'male',
    heightCentimeters: 187.9,
    miniBios:
      "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
  },
  {
    image: {
      height: 400,
      url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
      width: 265,
    },
    name: 'Paul Walker2',
    birthDate: '1973-09-12',
    birthPlace: 'Glendale, California2, USA',
    deathDate: '2013-11-30',
    gender: 'male',
    heightCentimeters: 187.9,
    miniBios:
      "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
  },
  {
    image: {
      height: 400,
      url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
      width: 265,
    },
    name: 'Paul Walker3',
    birthDate: '1973-09-12',
    birthPlace: 'Glendale3, California, USA',
    deathDate: '2013-11-30',
    gender: 'male',
    heightCentimeters: 187.9,
    miniBios:
      "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
  },
];

const newPeople: People = {
  image: {
    height: 400,
    url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
    width: 265,
  },
  name: 'Paul Walker',
  birthDate: '1973-09-12',
  birthPlace: 'Glendale, California, USA',
  deathDate: '2013-11-30',
  gender: 'male',
  heightCentimeters: 187.9,
  miniBios:
    "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
};

const updatedPeople = {
  image: {
    height: 400,
    url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
    width: 265,
  },
  name: 'Paul Walker',
  birthDate: '1973-09-12',
  birthPlace: 'Glendale, California, USA',
  deathDate: '2013-11-30',
  gender: 'male',
  heightCentimeters: 187.9,
  miniBios:
    "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
};

describe('PeopleService', () => {
  let peopleModel: Model<People>;
  let peopleService: PeopleService;

  const mockPeople = {
    getAll: jest.fn().mockResolvedValue(people),
    getByName: jest.fn().mockResolvedValue(people[0]),
    create: jest.fn().mockResolvedValue(newPeople),
    update: jest.fn().mockResolvedValue(updatedPeople),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PeopleService,
          useValue: mockPeople,
        },
        {
          provide: getModelToken('People'),
          useValue: mockPeople,
        },
      ],
    }).compile();

    peopleService = module.get<PeopleService>(PeopleService);
    peopleModel = module.get<Model<People>>(getModelToken('People'));
  });

  it('should be defined', () => {
    expect(peopleService).toBeDefined();
    expect(peopleModel).toBeDefined();
  });

  describe('getAll', () => {
    it('Deve retornar lista de usuarios logados', async () => {
      // Act
      const result = await peopleService.getAll();

      // Assert
      expect(result).toEqual(people);
      expect(typeof result).toEqual('object');
      expect(peopleService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(peopleService, 'getAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(peopleService.getAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Deve criar uma nova sessão com sucesso', async () => {
      // Arrange
      const body: People = {
        image: {
          height: 400,
          url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
          width: 265,
        },
        name: 'Paul Walker',
        birthDate: '1973-09-12',
        birthPlace: 'Glendale, California, USA',
        deathDate: '2013-11-30',
        gender: 'male',
        heightCentimeters: 187.9,
        miniBios:
          "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
      };
      // Act
      const result = await peopleService.create(body);

      // Assert
      expect(result).toEqual(newPeople);
      expect(peopleService.create).toHaveBeenCalledTimes(1);
      expect(peopleService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: People = {
        image: {
          height: 400,
          url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
          width: 265,
        },
        name: 'Paul Walker',
        birthDate: '1973-09-12',
        birthPlace: 'Glendale, California, USA',
        deathDate: '2013-11-30',
        gender: 'male',
        heightCentimeters: 187.9,
        miniBios:
          "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
      };
      jest.spyOn(peopleService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(peopleService.create(body)).rejects.toThrowError();
    });
  });
  describe('getByName', () => {
    it('Deve retornar uma sessão com sucesso pelo ID', async () => {
      // Act
      const result = await peopleService.getByName('Paul W');

      // Assert
      expect(result).toEqual(people[0]);
      expect(peopleService.getByName).toHaveBeenCalledTimes(1);
      expect(peopleService.getByName).toHaveBeenCalledWith('Paul W');
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(peopleService, 'getByName').mockRejectedValueOnce(new Error());

      // Assert
      expect(peopleService.getByName('Paul W')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('Deve alterar dados de uma sessão pelo ID', async () => {
      // Arrange
      const body: People = {
        image: {
          height: 400,
          url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
          width: 265,
        },
        name: 'Paul Walker',
        birthDate: '1973-09-12',
        birthPlace: 'Glendale, California, USA',
        deathDate: '2013-11-30',
        gender: 'male',
        heightCentimeters: 187.9,
        miniBios:
          "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
      };

      // Act
      const result = await peopleService.update(body.name, body);

      // Assert
      expect(result).toEqual(updatedPeople);
      expect(peopleService.update).toHaveBeenCalledTimes(1);
      expect(peopleService.update).toHaveBeenCalledWith(body.name, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: People = {
        image: {
          height: 400,
          url: 'https://m.media-amazon.com/images/M/MV5BMjIwODc0OTk2Nl5BMl5BanBnXkFtZTcwOTQ5MDA0Mg@@._V1_.jpg',
          width: 265,
        },
        name: 'Paul Walker',
        birthDate: '1973-09-12',
        birthPlace: 'Glendale, California, USA',
        deathDate: '2013-11-30',
        gender: 'male',
        heightCentimeters: 187.9,
        miniBios:
          "Paul William Walker IV was born in Glendale, California. He grew up together with his brothers, Caleb and Cody, and sisters, Ashlie and Amie. Their parents, Paul William Walker III, a sewer contractor, and Cheryl (Crabtree) Walker, a model, separated around September 2004. His grandfather, William Walker, was a Pearl Harbor survivor and a Navy middleweight boxing champion, while his maternal grandfather commanded a tank battalion in Italy under General Patton during World War II. Paul grew up active in sports like soccer and surfing. He had English and German ancestry.\n\nPaul was cast for the first season of the family sitcom, Throb (1986) and began modeling until he received a script for the 1994 movie, Tammy and the T-Rex (1994). He attended high school at Village Christian High School in Sun Valley, California, graduating in 1991. With encouragement from friends and an old casting agent who remembered him as a child, he decided to try his luck again with acting shortly after returning from College.\n\nHe starred in Meet the Deedles (1998), a campy, silly but surprisingly fun film which failed to garner much attention. However, lack of attention would not be a problem for Paul Walker for long. With Pleasantville (1998), he appeared in his first hit. As the town stud (a la 1950s) who more than meets his match in modern day Reese Witherspoon, he was one of the most memorable characters of the film. That same year, Paul and his then-girlfriend Rebecca had a baby girl named Meadow Walker (Meadow Rain Walker). Even though Paul publicly admitted that Meadow was not planned, he said that she is his number one priority. Paul and Rebecca separated and Meadow lives with her mother in Hawaii. She often visited with Paul as his homes in Santa Barbara and Huntington Beach, California.\n\nRoles in the teen hits Varsity Blues (1999), She's All That (1999) and The Skulls (2000) cemented Walker's continued rise to celebrity. He was chosen to be one of the young stars featured on the cover of Vanity Fair's annual Hollywood issue in April 2000. While the other stars on the cover, brooded and tried their best to look sexy and serious, Paul smiled brightly and showed why he is not part of the norm. This is one young actor who certainly stood apart from the rest of the crowd, not only with his talent but with his attitude. The Dallas Morning News commented in March of 2000 that, \"Paul is one of the rarest birds in Hollywood- a pretension free movie star.\" The latest blockbuster hit, The Fast and the Furious (2001), had raised his stardom to an even higher level.\n\nHis fighting scenes in movies lead to a passion for martial arts. He has studied various forms of Jujitsu, Taekwondo, Jeet Kune Do and Eskrima. Paul mentioned in a magazine interview that he had hoped enroll in the Keysi Fighting Method when it comes to the United States. Other than practicing martial arts, Paul enjoyed relaxing at home with his daughter, Meadow Rain, surfing near his Huntington Beach abode, walking his dogs and just driving.\n\nWhen Paul seriously did get a break from the entertainment business, he said he loved traveling. Paul had traveled to India, Fiji, Costa Rica, Sarawak, Brunei, Borneo and other parts of the Asian continent. Tragically, Paul Walker died in a car crash on Saturday November 30, 2013, after attending a charity event for \"Reach Out Worldwide\".\n\nSeveral of Paul's films were released after his death, include Hours (2013), Brick Mansions (2014), and his final starring role in The Fast and the Furious series, Furious 7 (2015), part of which was completed after his death. The film's closing scenes paid tribute to Walker, whose character met with a happy ending, and rode off into the sunset.",
      };

      jest.spyOn(peopleService, 'update').mockRejectedValueOnce(new Error());

      // Assert
      expect(peopleService.update(body.name, body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('Deve remover uma sessão com sucesso', async () => {
      // Arrange
      const id = {
        _id: '1',
      };

      // Act
      const result = await peopleService.delete(id._id);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const id = {
        _id: '1',
      };

      jest.spyOn(peopleService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(peopleService.delete(id._id)).rejects.toThrowError();
    });
  });
});
