import { faLink, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React from "react";

function MeaningSlide({ meaningList, currentSlide, setCurrentSlide, url}) {
  const itemPerSlide = 1;
  const indexOfLastItem = currentSlide * itemPerSlide;
  const indexOfFirstItem = indexOfLastItem - itemPerSlide;
  const currentMeaning = meaningList?.slice(indexOfFirstItem, indexOfLastItem);
  const NoOfSlides = Math.ceil(meaningList?.length / 1);
  const ArrayOfNavCircles = Array(NoOfSlides).fill("item");

  const handleNavigation = (index) => {
    setCurrentSlide(index + 1)
  }

  return (
    <div>
      {currentMeaning.map(
        ({ partOfSpeech, definitions, antonyms, synonyms }, index) => (
          <div key={index} className="mt-10">
            <p className="relative after:absolute after:inline-block after:bg-gray-300 after:-right-[120px] lg:after:-right-40 font-bold font-alkatra text-lg overflow-hidden after:w-full after:h-[0.5px] after:top-1/2 after:translate-y-1/2">
              {partOfSpeech}
            </p>
            <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-3">
              meaning
            </p>

            {definitions?.map(({ definition }, index) => (
              <p className="mb-2 last:mb-0" key={index}>
                <FontAwesomeIcon
                  className="text-fuchsia-700 mr-2"
                  icon={faPlusCircle}
                />
                {definition}
              </p>
            ))}

            {definitions[0].example && (
                      <>
                        <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">
                          example
                        </p>
                        <p>{definitions[0].example}</p>
                      </>
                    )}

                   {
                    antonyms.length !== 0 ?
                     (<>
                     <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">antonyms:</p>
                     <p>
                     {antonyms.map((item, index) => (
                        <span key={index}>{index !== antonyms.length - 1 ? `${item}, `: `${item}.`}</span>
                      ))}
                     </p>
                     </>) : (
                      <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">antonyms:</p>
                      <p className="italic text-sm">No antonym to display</p>
                      </>
                     )
                   }

                   {
                    synonyms.length !== 0 ?
                     (<>
                     <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">synonyms:</p>
                     <p>
                     {synonyms.map((item, index) => (
                        <span key={index}>{index !== synonyms.length - 1 ? `${item}, `: `${item}.`}</span>
                      ))}
                     </p>
                     </>) : (
                      <>
                      <p className="capitalize font-alkatra text-fuchsia-600 text-lg underline tracking-widest pt-8 pb-1">synonyms:</p>
                      <p className="italic text-sm">No synonym to display</p>
                      </>
                     )
                   }
          </div>
        )
      )}


      <div className={classNames("flex items-center gap-3 justify-center mt-5", {
        "hidden": ArrayOfNavCircles?.length < 2
      })}>
        {ArrayOfNavCircles.map((item, index) => (
            <span onClick={() => handleNavigation(index)} key={index} className={classNames('cursor-pointer inline-block border rounded', {
                'bg-fuchsia-700 w-5 h-1.5': index + 1 === currentSlide,
                'bg-gray-400 hover:border-fuchsia-900 w-2.5 h-1.5': index + 1 !== currentSlide
            })}></span>
        ))}
      </div>
    </div>
  );
}

export default MeaningSlide;
