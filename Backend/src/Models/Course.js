class Course {
    constructor(course_id, instructor_id, imageURL, title, description, OldPrice, NewPrice, createdDate, Type, QualitiesLectures) {
        this._course_id = course_id;
        this._instructor_id = instructor_id;
        this._imageURL = imageURL;
        this._title = title;
        this._description = description;
        this._OldPrice = OldPrice;
        this._NewPrice = NewPrice;
        this._createdDate = createdDate;
        this._Type = Type;
        this._QualitiesLectures = QualitiesLectures;

    }

}

module.exports = Course;