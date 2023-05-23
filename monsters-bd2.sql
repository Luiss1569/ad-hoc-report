PGDMP                         {         	   monsters     15.2    15.2 )    ;           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            <           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            =           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            >           1262    16504 	   monsters     DATABASE     �   CREATE DATABASE "monsters " WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE "monsters ";
                postgres    false            �            1259    16523    actions    TABLE     �   CREATE TABLE public.actions (
    id integer NOT NULL,
    name character varying[] NOT NULL,
    description character varying NOT NULL,
    damage_dice character varying,
    attack_bonus smallint,
    monster_id integer
);
    DROP TABLE public.actions;
       public         heap    postgres    false            �            1259    24696    monsters    TABLE     �  CREATE TABLE public.monsters (
    id integer NOT NULL,
    name character varying(50),
    size character varying(50),
    type character varying(50),
    subtype character varying(50),
    groupp character varying(50),
    strength integer,
    dexterity integer,
    constitution integer,
    intelligence integer,
    wisdom integer,
    charisma integer,
    strength_save integer,
    dexterity_save integer,
    constitution_save integer,
    intelligence_save integer,
    wisdom_save integer,
    charisma_save integer,
    perception integer,
    skill_id bigint,
    speed_id bigint,
    damage_vulnerabilities text,
    damage_resistances text,
    damage_immunities text,
    condition_immunities text,
    senses text,
    languages text,
    challenge_rating integer,
    legendary_desc text,
    legendary_actions text,
    page_no integer,
    img_main character varying(50),
    slug character varying
);
    DROP TABLE public.monsters;
       public         heap    postgres    false            �            1259    16530 	   reactions    TABLE     �   CREATE TABLE public.reactions (
    name character varying NOT NULL,
    description character varying NOT NULL,
    id integer NOT NULL,
    monster_id integer
);
    DROP TABLE public.reactions;
       public         heap    postgres    false            �            1259    16518    skills    TABLE     �  CREATE TABLE public.skills (
    id integer NOT NULL,
    athletics smallint,
    perception smallint,
    stealth smallint,
    intimidation smallint,
    history smallint,
    deception smallint,
    performance smallint,
    persuasion smallint,
    medicine smallint,
    religion smallint,
    insight smallint,
    arcana smallint,
    acrobatics smallint,
    survival smallint,
    investigation smallint,
    nature smallint
);
    DROP TABLE public.skills;
       public         heap    postgres    false            �            1259    16549    special_abilities    TABLE     �   CREATE TABLE public.special_abilities (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL
);
 %   DROP TABLE public.special_abilities;
       public         heap    postgres    false            �            1259    24718    special_abilities_monsters    TABLE     �   CREATE TABLE public.special_abilities_monsters (
    id integer NOT NULL,
    special_abilities_id integer,
    monster_id integer
);
 .   DROP TABLE public.special_abilities_monsters;
       public         heap    postgres    false            �            1259    16537    speed    TABLE     �   CREATE TABLE public.speed (
    id integer NOT NULL,
    walk smallint,
    burrow smallint,
    climb smallint,
    fly smallint,
    swim smallint,
    hover boolean
);
    DROP TABLE public.speed;
       public         heap    postgres    false            �            1259    16542    spells_list    TABLE     �  CREATE TABLE public.spells_list (
    id integer NOT NULL,
    slug character varying NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    higher_level smallint,
    page character varying,
    range character varying,
    largest_range_sort character varying,
    components character varying,
    requires_verbal_components boolean,
    requires_somatic_components boolean,
    requires_material_components boolean,
    material character varying,
    can_be_cast_as_ritual boolean,
    ritual character varying,
    duration character varying,
    concentration character varying,
    requires_concentration boolean,
    casting_time character varying,
    level character varying,
    level_int smallint,
    spell_level smallint,
    school character varying,
    dnd_class character varying,
    archetype character varying,
    circles character varying
);
    DROP TABLE public.spells_list;
       public         heap    postgres    false            �            1259    16568    spells_list_monsters    TABLE     z   CREATE TABLE public.spells_list_monsters (
    id integer NOT NULL,
    monster_id integer,
    spells_list_id integer
);
 (   DROP TABLE public.spells_list_monsters;
       public         heap    postgres    false            1          0    16523    actions 
   TABLE DATA           _   COPY public.actions (id, name, description, damage_dice, attack_bonus, monster_id) FROM stdin;
    public          postgres    false    215   �;       7          0    24696    monsters 
   TABLE DATA           �  COPY public.monsters (id, name, size, type, subtype, groupp, strength, dexterity, constitution, intelligence, wisdom, charisma, strength_save, dexterity_save, constitution_save, intelligence_save, wisdom_save, charisma_save, perception, skill_id, speed_id, damage_vulnerabilities, damage_resistances, damage_immunities, condition_immunities, senses, languages, challenge_rating, legendary_desc, legendary_actions, page_no, img_main, slug) FROM stdin;
    public          postgres    false    221   <       2          0    16530 	   reactions 
   TABLE DATA           F   COPY public.reactions (name, description, id, monster_id) FROM stdin;
    public          postgres    false    216   .<       0          0    16518    skills 
   TABLE DATA           �   COPY public.skills (id, athletics, perception, stealth, intimidation, history, deception, performance, persuasion, medicine, religion, insight, arcana, acrobatics, survival, investigation, nature) FROM stdin;
    public          postgres    false    214   K<       5          0    16549    special_abilities 
   TABLE DATA           B   COPY public.special_abilities (id, name, description) FROM stdin;
    public          postgres    false    219   h<       8          0    24718    special_abilities_monsters 
   TABLE DATA           Z   COPY public.special_abilities_monsters (id, special_abilities_id, monster_id) FROM stdin;
    public          postgres    false    222   �<       3          0    16537    speed 
   TABLE DATA           J   COPY public.speed (id, walk, burrow, climb, fly, swim, hover) FROM stdin;
    public          postgres    false    217   �<       4          0    16542    spells_list 
   TABLE DATA           �  COPY public.spells_list (id, slug, name, description, higher_level, page, range, largest_range_sort, components, requires_verbal_components, requires_somatic_components, requires_material_components, material, can_be_cast_as_ritual, ritual, duration, concentration, requires_concentration, casting_time, level, level_int, spell_level, school, dnd_class, archetype, circles) FROM stdin;
    public          postgres    false    218   �<       6          0    16568    spells_list_monsters 
   TABLE DATA           N   COPY public.spells_list_monsters (id, monster_id, spells_list_id) FROM stdin;
    public          postgres    false    220   �<       �           2606    16529    actions actions_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.actions
    ADD CONSTRAINT actions_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.actions DROP CONSTRAINT actions_pkey;
       public            postgres    false    215            �           2606    24702    monsters monsters_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.monsters
    ADD CONSTRAINT monsters_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.monsters DROP CONSTRAINT monsters_pkey;
       public            postgres    false    221            �           2606    24754    monsters monsters_slug_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.monsters
    ADD CONSTRAINT monsters_slug_key UNIQUE (slug);
 D   ALTER TABLE ONLY public.monsters DROP CONSTRAINT monsters_slug_key;
       public            postgres    false    221            �           2606    16567    reactions reactions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT reactions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.reactions DROP CONSTRAINT reactions_pkey;
       public            postgres    false    216            �           2606    16522    skills skills_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.skills DROP CONSTRAINT skills_pkey;
       public            postgres    false    214            �           2606    24756    spells_list slug_unique 
   CONSTRAINT     R   ALTER TABLE ONLY public.spells_list
    ADD CONSTRAINT slug_unique UNIQUE (slug);
 A   ALTER TABLE ONLY public.spells_list DROP CONSTRAINT slug_unique;
       public            postgres    false    218            �           2606    24722 :   special_abilities_monsters special_abilities_monsters_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.special_abilities_monsters
    ADD CONSTRAINT special_abilities_monsters_pkey PRIMARY KEY (id);
 d   ALTER TABLE ONLY public.special_abilities_monsters DROP CONSTRAINT special_abilities_monsters_pkey;
       public            postgres    false    222            �           2606    16555 (   special_abilities special_abilities_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.special_abilities
    ADD CONSTRAINT special_abilities_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.special_abilities DROP CONSTRAINT special_abilities_pkey;
       public            postgres    false    219            �           2606    16541    speed speed_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.speed
    ADD CONSTRAINT speed_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.speed DROP CONSTRAINT speed_pkey;
       public            postgres    false    217            �           2606    16572 .   spells_list_monsters spells_list_monsters_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.spells_list_monsters
    ADD CONSTRAINT spells_list_monsters_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.spells_list_monsters DROP CONSTRAINT spells_list_monsters_pkey;
       public            postgres    false    220            �           2606    16548    spells_list spells_list_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.spells_list
    ADD CONSTRAINT spells_list_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.spells_list DROP CONSTRAINT spells_list_pkey;
       public            postgres    false    218            �           2606    24733    reactions fk_monster    FK CONSTRAINT     y   ALTER TABLE ONLY public.reactions
    ADD CONSTRAINT fk_monster FOREIGN KEY (monster_id) REFERENCES public.monsters(id);
 >   ALTER TABLE ONLY public.reactions DROP CONSTRAINT fk_monster;
       public          postgres    false    221    216    3221            �           2606    24738    actions fk_monster    FK CONSTRAINT     w   ALTER TABLE ONLY public.actions
    ADD CONSTRAINT fk_monster FOREIGN KEY (monster_id) REFERENCES public.monsters(id);
 <   ALTER TABLE ONLY public.actions DROP CONSTRAINT fk_monster;
       public          postgres    false    3221    215    221            �           2606    24743    spells_list_monsters fk_monster    FK CONSTRAINT     �   ALTER TABLE ONLY public.spells_list_monsters
    ADD CONSTRAINT fk_monster FOREIGN KEY (monster_id) REFERENCES public.monsters(id);
 I   ALTER TABLE ONLY public.spells_list_monsters DROP CONSTRAINT fk_monster;
       public          postgres    false    221    220    3221            �           2606    24748 "   spells_list_monsters fk_spell_list    FK CONSTRAINT     �   ALTER TABLE ONLY public.spells_list_monsters
    ADD CONSTRAINT fk_spell_list FOREIGN KEY (spells_list_id) REFERENCES public.spells_list(id);
 L   ALTER TABLE ONLY public.spells_list_monsters DROP CONSTRAINT fk_spell_list;
       public          postgres    false    218    220    3215            �           2606    24703    monsters monsters_skill_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.monsters
    ADD CONSTRAINT monsters_skill_id_fkey FOREIGN KEY (skill_id) REFERENCES public.skills(id);
 I   ALTER TABLE ONLY public.monsters DROP CONSTRAINT monsters_skill_id_fkey;
       public          postgres    false    221    3205    214            �           2606    24708    monsters monsters_speed_id_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.monsters
    ADD CONSTRAINT monsters_speed_id_fkey FOREIGN KEY (speed_id) REFERENCES public.speed(id);
 I   ALTER TABLE ONLY public.monsters DROP CONSTRAINT monsters_speed_id_fkey;
       public          postgres    false    221    3211    217            �           2606    24728 E   special_abilities_monsters special_abilities_monsters_monster_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.special_abilities_monsters
    ADD CONSTRAINT special_abilities_monsters_monster_id_fkey FOREIGN KEY (monster_id) REFERENCES public.monsters(id);
 o   ALTER TABLE ONLY public.special_abilities_monsters DROP CONSTRAINT special_abilities_monsters_monster_id_fkey;
       public          postgres    false    3221    222    221            �           2606    24723 O   special_abilities_monsters special_abilities_monsters_special_abilities_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.special_abilities_monsters
    ADD CONSTRAINT special_abilities_monsters_special_abilities_id_fkey FOREIGN KEY (special_abilities_id) REFERENCES public.special_abilities(id);
 y   ALTER TABLE ONLY public.special_abilities_monsters DROP CONSTRAINT special_abilities_monsters_special_abilities_id_fkey;
       public          postgres    false    222    219    3217            1      x������ � �      7      x������ � �      2      x������ � �      0      x������ � �      5      x������ � �      8      x������ � �      3      x������ � �      4      x������ � �      6      x������ � �     