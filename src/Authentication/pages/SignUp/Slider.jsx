import React, { useState } from "react";
import AddSchoolDetail from "./AddSchoolDetail";
import PersonalData from "./PersonalData";
import ChooseInterest from "./ChooseInterest";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "src/ui/carousel";
import { IoChevronBackOutline } from "react-icons/io5";
import BioData from "./BioData";
import PeopleToFollow from "./PeopleToFollow";

const Slider = ({ onNext, user, onClose }) => {
  const [currentComponent, setCurrentComponent] = useState(0);
  const [components, setComponents] = useState([
    { component: <AddSchoolDetail user={user} />, progress: 0 },
    { component: <BioData />, progress: 0 },
    { component: <ChooseInterest />, progress: 0 },
    { component: <PeopleToFollow />, progress: 0 },
  ]);

  // const nextComponent = () => {
  //   setCurrentComponent((current) =>
  //     current < components.length - 1 ? current + 1 : current
  //   );
  //   updateProgress(currentComponent + 1);
  // };

  // const previousComponent = () => {
  //   setCurrentComponent((current) => (current > 0 ? current - 1 : current));
  //   updateProgress(currentComponent - 1);
  // };

  const updateProgress = (index) => {
    const updatedComponents = components.map((comp, i) => ({
      ...comp,
      progress: i <= index ? 100 : 0,
    }));
    setComponents(updatedComponents);
  };

  return (
    <Carousel className="rounded-xl bg-white w-[90%]  p-4 lg:w-[40%]">
      <div className="flex justify-between items-center mx-3 mt-2">
        <CarouselPrevious>
          <IoChevronBackOutline />
        </CarouselPrevious>
        <p className="text-black cursor-pointer" onClick={onClose}>
          Cancel
        </p>
      </div>
      <div className="progress-container mt-4">
        {components.map((comp, index) => (
          <div
            key={index}
            className={`progress ${
              comp.progress === 100 ? "progress-filled" : ""
            }`}
          ></div>
        ))}
      </div>
      <CarouselContent>
        {components.map((comp, index) => (
          <CarouselItem
            key={index}
            className={index === currentComponent ? "active" : ""}
          >
            {comp.component}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselNext onClick={nextComponent}>Next</CarouselNext> */}
    </Carousel>
  );
};

export default Slider;
