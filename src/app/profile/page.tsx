"use client";

import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import { parse } from "path";

const ProfilePage = () => {
  const [isEditAbout, setIsEditAbout] = useState(false);
  const [isEditInterests, setIsEditInterests] = useState(false);
  const [isSaveUpdate, setIsSaveUpdate] = useState(false);
  const [isSaveInterests, setIsSaveInterests] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState({});
  const [selectedGender, setSelectedGender] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [tags, setTags] = useState([]);
  const [tempTags, setTempTags] = useState([]);
  const [inputTagsValue, setInputTagsValue] = useState("");
  const [bio, setBio] = useState({
    selectedImage: "",
    name: "",
    birthday: "",
    selectedGender: "",
    height: "",
    weight: "",
    horoscope: "",
    zodiac: "",
  });

  const storedUserData = localStorage.getItem("userData");

  const isBioEmpty =
    !bio.birthday &&
    !bio.horoscope &&
    !bio.zodiac &&
    !bio.height &&
    !bio.weight;

  useEffect(() => {
    setTempTags([...tags]);
  }, [tags]);

  const handleEditAbout = () => {
    setIsEditAbout(true);
  };

  const handleSaveUpdate = (event) => {
    event.preventDefault();
    // Validate if all required fields are filled
    if (
      !selectedImage ||
      !name ||
      !birthday.day ||
      !birthday.month ||
      !birthday.year ||
      !selectedGender ||
      !height ||
      !weight
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setBio({
      selectedImage,
      name,
      birthday,
      selectedGender,
      height,
      weight,
      horoscope,
      zodiac,
    });

    setIsSaveUpdate(true);
    setIsEditAbout(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setSelectedImage(previewURL);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleBirthdayChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
    if (value.length > 2 && value.length <= 4)
      value = value.replace(/^(\d{2})/, "$1 ");
    if (value.length > 4) value = value.replace(/^(\d{2})(\d{2})/, "$1 $2 ");
    e.target.value = value.slice(0, 10); // Limit input to DD MM YYYY

    // Get the date from the input
    if (value.length === 10) {
      const day = parseInt(value.slice(0, 2), 10);
      const month = parseInt(value.slice(3, 5), 10) - 1; // months are 0-indexed
      const year = parseInt(value.slice(6), 10);
      const date = new Date(year, month, day);

      setBirthday({ day, month, year });
      // Get the horoscope sign based on the date
      const sign = getHoroscopeSign(date);
      setHoroscope(sign); // Set the horoscope sign state

      // Get the zodiac sign based on the year
      const zodiacSign = getZodiac(year);
      setZodiac(zodiacSign); // Set the zodiac sign state
    }
  };

  const getHoroscopeSign = (date) => {
    const horoscopes = [
      {
        sign: "Capricorn",
        end: new Date(date.getFullYear(), 0, 19),
        icon: "♑",
      }, // Capricorn end date is January 19
      {
        sign: "Aquarius",
        end: new Date(date.getFullYear(), 1, 18),
        icon: "♒",
      }, // Aquarius end date is February 18
      { sign: "Pisces", end: new Date(date.getFullYear(), 2, 20), icon: "♓" },
      { sign: "Aries", end: new Date(date.getFullYear(), 3, 19), icon: "♈" },
      { sign: "Taurus", end: new Date(date.getFullYear(), 4, 20), icon: "♉" },
      { sign: "Gemini", end: new Date(date.getFullYear(), 5, 20), icon: "♊" },
      { sign: "Cancer", end: new Date(date.getFullYear(), 6, 22), icon: "♋" },
      { sign: "Leo", end: new Date(date.getFullYear(), 7, 22), icon: "♌" },
      { sign: "Virgo", end: new Date(date.getFullYear(), 8, 22), icon: "♍" },
      { sign: "Libra", end: new Date(date.getFullYear(), 9, 22), icon: "♎" },
      {
        sign: "Scorpio",
        end: new Date(date.getFullYear(), 10, 21),
        icon: "♏",
      },
      {
        sign: "Sagittarius",
        end: new Date(date.getFullYear(), 11, 21),
        icon: "♐",
      },
    ];

    for (let i = 0; i < horoscopes.length; i++) {
      if (date <= horoscopes[i].end) {
        return horoscopes[i];
      }
    }
    return horoscopes[0]; // Default to Capricorn if date is after Sagittarius end date (Dec 21)
  };

  const getZodiac = (year) => {
    const zodiacs = [
      { sign: "Rat", icon: "🐀" },
      { sign: "Ox", icon: "🐂" },
      { sign: "Tiger", icon: "🐅" },
      { sign: "Rabbit", icon: "🐇" },
      { sign: "Dragon", icon: "🐉" },
      { sign: "Snake", icon: "🐍" },
      { sign: "Horse", icon: "🐎" },
      { sign: "Goat", icon: "🐐" },
      { sign: "Monkey", icon: "🐒" },
      { sign: "Rooster", icon: "🐓" },
      { sign: "Dog", icon: "🐕" },
      { sign: "Pig", icon: "🐖" },
    ];

    // Check for valid year (positive integer and reasonable range)
    if (year < 1900 || year > 2100) {
      return { sign: "Invalid Year", icon: "❌" };
    }

    return zodiacs[(year - 1900) % 12];
  };

  const handleWeightChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setWeight(value.toString());
    }
  };

  const handleHeightChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setHeight(value.toString());
    }
  };

  const handleEditInterests = () => {
    setIsEditInterests(true);
  };

  const handleAddTag = (e) => {
    if (e.key === "Enter" && inputTagsValue.trim() !== "") {
      setTempTags([...tempTags, inputTagsValue.trim()]);
      setInputTagsValue("");
    }
  };

  const handleSaveInterests = () => {
    setTags([...tempTags]);
    setIsSaveInterests(true);
    setIsEditInterests(false);
  };

  const handleBackTags = () => {
    setTempTags([...tags]);
    setIsEditInterests(false);
  };

  const removeTag = (index) => {
    setTempTags(tempTags.filter((_, i) => i !== index));
  };

  const calculateAge = (day, month, year) => {
    const birthDate = new Date(year, month, day);
    const currentDate = new Date();

    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDiff = currentDate.getMonth() - birthDate.getMonth();

    // If the birth date has not occurred yet this year, subtract one from the age
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div
      className={`profileContainer ${
        isEditInterests ? "bg-gradient-rotated" : ""
      }`}
    >
      <div className="navbar grid grid-cols-3 mt-5">
        {isEditInterests ? (
          <div
            className="back text-white flex items-center ms-2 cursor-pointer"
            onClick={handleBackTags}
          >
            <IoIosArrowBack className="text-2xl font-semibold" /> Back
          </div>
        ) : (
          <div className="back text-white flex items-center ms-2 cursor-pointer">
            <IoIosArrowBack className="text-2xl font-semibold" /> Back
          </div>
        )}

        {isEditInterests ? (
          <div
            className="save col-start-3 bg-gradient-to-r from-[#abfffd] to-[#4599db] text-transparent bg-clip-text flex items-center justify-end me-8 font-semibold cursor-pointer"
            onClick={handleSaveInterests}
          >
            Save
          </div>
        ) : (
          <div className="title text-white flex justify-center items-center font-semibold">
            @johndoe123
          </div>
        )}
      </div>
      {isEditInterests ? (
        <div className="flex flex-col justify-center items-center mt-20 w-full">
          <div className="w-[90vw] mb-8">
            <div className="bg-golden text-transparent bg-clip-text font-bold text-sm mb-2">
              Tell everyone about your interests
            </div>
            <div className="text-white font-bold text-xl">
              What interests you?
            </div>
          </div>
          <div className="flex justify-center w-full">
            <div className="w-[90vw] flex flex-wrap gap-2 p-3 bg-white/5 rounded-lg shadow-md">
              {tempTags.map((tempTag, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 bg-[#374c50] rounded-md text-white"
                >
                  {tempTag}
                  <span
                    className="ms-2 text-xl cursor-pointer"
                    onClick={() => removeTag(index)}
                  >
                    <MdClose />
                  </span>
                </div>
              ))}
              <input
                className="bg-transparent border-none outline-none text-white flex-grow min-w-[50px]"
                type="text"
                value={inputTagsValue}
                onChange={(e) => setInputTagsValue(e.target.value)}
                onKeyDown={handleAddTag}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="profileInfo flex flex-col items-center">
          <div className="profileImage relative w-[95vw] h-48 bg-[#162329] rounded-xl mt-10">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="Selected"
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              ""
            )}
            <div className="edit absolute top-1 right-2">
              <label className="flex items-center cursor-pointer">
                <BiEditAlt className="text-xl text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required={!selectedImage}
                />
              </label>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="userName text-white font-bold">
                @johndoe123
                {birthday.day &&
                  birthday.month &&
                  birthday.year &&
                  `, ${calculateAge(
                    birthday.day,
                    birthday.month,
                    birthday.year
                  )}`}
              </div>
              {birthday.day && birthday.month && birthday.year ? (
                <>
                  <p className="text-white capitalize mb-2">{selectedGender}</p>
                  <div className="flex">
                    <div className="p-2 border-none rounded-3xl bg-gradient-to-r from-[#232622] to-[#121615] text-white me-2">
                      {horoscope.icon} {horoscope.sign}
                    </div>
                    <div className="p-2 border-none rounded-3xl bg-gradient-to-r from-[#232622] to-[#121615] text-white">
                      {zodiac.icon} {zodiac.sign}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="h-auto about p-4 ps-6 pb-10 w-[95vw] bg-[#0e191f]  rounded-xl mt-6">
            <div className="flex justify-between">
              <div className="userName text-white font-bold cursor-pointer">
                About
              </div>
              <div className="edit">
                {isEditAbout ? (
                  <button
                    className="bg-golden text-transparent bg-clip-text cursor-pointer"
                    type="submit"
                    form="aboutForm"
                  >
                    Save & Update
                  </button>
                ) : (
                  <BiEditAlt
                    className="text-xl text-white cursor-pointer"
                    onClick={handleEditAbout}
                  />
                )}
              </div>
            </div>
            <div className="content mt-5">
              {isEditAbout ? (
                <form id="aboutForm" onSubmit={handleSaveUpdate}>
                  <div className="flex items-center mb-5">
                    <label className="flex items-center cursor-pointer">
                      <div className="w-16 h-16 bg-[#1a252a] rounded-2xl mr-4 border-2 border-[#2c373c] relative">
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            alt="Selected"
                            width={200}
                            height={200}
                            className="w-full h-full object-cover rounded-2xl"
                          />
                        ) : (
                          <div className="absolute top-1 left-3.5 text-5xl font-extralight bg-golden text-transparent bg-clip-text">
                            +
                          </div>
                        )}
                      </div>
                      <p className="text-white">
                        {selectedImage ? "Change image" : "Add image"}
                      </p>
                      <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        required={!selectedImage}
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">
                      Display Name:
                    </p>
                    <input
                      className="bg-[#1a252a] placeholder-white/60 border-2 border-[#2c373c] rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md text-white w-full text-right"
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      onChange={handleNameChange}
                      value={name}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">Gander:</p>
                    <div className="relative w-full">
                      <select
                        name="gender"
                        value={selectedGender}
                        onChange={handleGenderChange}
                        className={`block w-full appearance-none border-2 border-[#2c373c] rounded-lg focus:outline-none bg-[#1a252a] p-3 pr-8 ${
                          selectedGender ? "text-white" : "text-white/60"
                        } focus:ring-2 text-right cursor-pointer`}
                      >
                        <option value="" hidden>
                          Select Gender
                        </option>
                        <option value="male" className="text-white">
                          Male
                        </option>
                        <option value="female" className="text-white">
                          Female
                        </option>
                        <option value="other" className="text-white">
                          Other
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">Birthday:</p>
                    <input
                      className="bg-[#1a252a] placeholder-white/60 border-2 border-[#2c373c] rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md text-white w-full text-right"
                      type="text"
                      name="birthday"
                      placeholder="DD MM YYYY"
                      maxLength="10"
                      required
                      onInput={handleBirthdayChange}
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">
                      Horoscope:
                    </p>
                    <input
                      className="bg-[#1a252a] placeholder-white/60 border-2 border-[#2c373c] rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md text-white/60 w-full text-right"
                      type="text"
                      name="horoscope"
                      placeholder="--"
                      value={horoscope.sign}
                      required
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">Zodiac:</p>
                    <input
                      className="bg-[#1a252a] placeholder-white/60 border-2 border-[#2c373c] rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md text-white/60 w-full text-right"
                      type="text"
                      name="zodiac"
                      placeholder="--"
                      required
                      value={zodiac.sign}
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">Height:</p>
                    <div className="relative w-full">
                      <input
                        className={`bg-[#1a252a] placeholder-white/60 border-2 border-[#2c373c] rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md text-white w-full text-right ${
                          height ? "pr-9" : ""
                        }`}
                        type="number"
                        name="height"
                        value={height}
                        onChange={handleHeightChange}
                        required
                        placeholder="Add height"
                      />
                      {height && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                          cm
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-[1fr_2fr] mb-3">
                    <p className="text-white/60 flex items-center">Weight:</p>
                    <div className="relative w-full">
                      <input
                        className={`bg-[#1a252a] placeholder-white/60 border-2 border-[#2c373c] rounded-lg p-3 focus:outline-none focus:ring-2 shadow-md text-white w-full text-right ${
                          weight ? "pr-8" : ""
                        }`}
                        type="number"
                        name="weight"
                        value={weight}
                        onChange={handleWeightChange}
                        required
                        placeholder="Add weight"
                      />
                      {weight && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
                          kg
                        </span>
                      )}
                    </div>
                  </div>
                </form>
              ) : isBioEmpty ? (
                <p className="text-white/60">
                  Add in your bio to help others know you better
                </p>
              ) : (
                <div className="leading-10">
                  <p className="text-white/60">
                    Birthday:{" "}
                    <span className="text-white">{`${bio.birthday.day}/${
                      bio.birthday.month + 1
                    }/${bio.birthday.year} Age(${calculateAge(
                      bio.birthday.day,
                      bio.birthday.month,
                      bio.birthday.year
                    )})`}</span>
                  </p>
                  <p className="text-white/60">
                    Horoscope:{" "}
                    <span className="text-white">{bio.horoscope.sign}</span>
                  </p>
                  <p className="text-white/60">
                    Zodiac:{" "}
                    <span className="text-white">{bio.zodiac.sign}</span>
                  </p>
                  <p className="text-white/60">
                    Height: <span className="text-white">{bio.height}</span>
                  </p>
                  <p className="text-white/60">
                    Weight: <span className="text-white">{bio.weight}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="interest p-4 ps-6 pb-10 w-[95vw] h-auto bg-[#0e191f]  rounded-xl mt-4">
            <div className="flex justify-between">
              <div className="userName text-white font-bold">Interest</div>
              <div className="edit">
                <BiEditAlt
                  className="text-xl text-white cursor-pointer"
                  onClick={handleEditInterests}
                />
              </div>
            </div>
            <div className="content mt-5 flex flex-wrap gap-2">
              {tags.length > 0 ? (
                tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 px-4 bg-[#1c272c] rounded-3xl text-white"
                  >
                    {tag}
                  </div>
                ))
              ) : (
                <p className="text-white/60">
                  Add in your interest to find a better match
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfilePage;
