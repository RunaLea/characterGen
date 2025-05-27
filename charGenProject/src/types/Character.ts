interface Character {
    id: string,
    char_name: string,
    race_title: string,
    race_id: string,
    class_lvl: string | string[],
    class_title: string | string[],
    subclass_title: string | string[]
}

export { type Character }