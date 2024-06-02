import React from 'react';

const searchInputClasses = "bg-transparent flex-grow outline-none text-white px-4";
const searchButtonClasses = "bg-zinc-900 text-white rounded-full p-2 ml-2";
const imageSizeClasses = "w-8 h-8";

const InputBar = () => {
    return (
        <div className="inputBar flex flex-col justify-end pb-4 overflow-hidden" style={{ width: '80%' }}>
            <div className="flex items-center bg-zinc-800 rounded-full p-2 mt-0 ml-10 w-11/12">
                <input type="text" className={` ${searchInputClasses}`} placeholder="Search..." />
                <button className={searchButtonClasses}>
                    <img aria-hidden="true" alt="arrow" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAALIElEQVR4nO1dCZAdVRV9AaMS4oZGUEurFKTEuGBCVCCAAiol4g4CSVQgUUTAUpYoRmRxQVwwahWKCApGEqJARROR0giFSkgQWQKoEASNwQAOYJz5fc5Lcq07/76pm3ZGM5n5v/v/eadqqqZfz/zpfvfdfZkQMjIyMjIyMjIyMjIyMjIyMjIyMjIyMtoCERkH4BUAPgDgcyQXAVhB8j4A6wA8AeBx/Z7kvQBuInkFgHMAzCqKYo9MqpET4bkkTyB5NYBHScpIvgD8g+RiAHNEZKdMoK0jwpMBzATwcwCxtKl/IbmA5DwA7yM5tdFovEREniMiE0RkRxGZpGskpwE4iuRnlVNI/q1EHMVPARwhIk/KxPlvQjyd5Kkk17pNK0heoyKnr6/vRSPdNCUUgGMALAXAEqFPUoKOecLo6ST5MQCPuQ26DcBsEXlWqzZIucrE4d3uADxM8kMist2YJEyM8Q0k73QbsjzGeIgq8MF+XkSepvdJnkHyEgA3klyjugHAv0yxP2SK/gaSF5P8ZIzx4KFOv25+URTvAPA7dyBuIbl3GCsQkacAuADAZtuAe2OMhw72s42mPvg0gJW26csBfAHAsST3Mx0yyfTHRDUEGo3GriQPUC4DcJ4SB8AG2/TThhJ/RVG8l+SDdjg2Afh81+uXRqOxm53AfsWqm60E8j8jItursgXwWzv939DNV4W/rX9XRJ4aY3wjgAsBPALgeuWMsnhS40DN6mRQAPjNaOivWsI25HHjivtI7uXv6+YAmG0i50bbsFE/oSIyXrkBwM2qQ9SqK4tJktNJ/tWIoib360M3wTagMGIsVqvK3ye5D8nf68ltp/xWPaZOpHHjFH9PfRUAPzOi9A4lVjsO6ogB2Ggv9nUvJkyfzFc/AcCRQyn0NkQBPmge/xc9V6r4JHmRPXsEMCN0MoqieKcSQxU4gLNK93YneSvJq1pp4g7HFDZncaUaBv4eyblGlI36TqETEWM80Impuf6eKmkLZRwfagQRGUfy4xYTm+bvaVwsia+O0yl6+tUvsBf42iBcsz7GeFCoKWKMh9ozvqVErO/aOz3SMdaX6gUTRcoZi7zOMGKsKyvQOoLk3srF6oyWTPKlySTuCD/F/IZ+h89bU+asre5OM1zsk9i8zOW40D85/n4D/bzPFwPArRYih4H2vj8V11fwAPw5wDOhzKQWcU5fZ5Rp2ldxnPUDpUnO/cL/cVO1Kv41KynmQCAZXUJmc+bRLPQIBSB8kaq4UsDoPMcmIJ8D7yrNoOguuQWe8zDk52m68jAXhs5WovTwdpjD5z0A7DO/EB+I+Q+Uy8yD8G4PmMNkDSgka8gB7w/HrKfpeBOiFG8B4AOsySzV5ItiM3rt1pRwnj60AdrmXwFz0wD+RAgC3lM4DwBM/A3CXnwhv7Ak/TCYsc1QrnBYvgWAA2Q+BCbl8Hi+DJjP2cXbMHcnR4fZD5cB/Nwf2fJlN5q0m/r+tifk4XsDLk30+lnqHgchPj60wF3wEQeC4uXhMGL7/ANBkgecC/AzBYyN7Qkgtbdn4nF15A6gkdhFak4ttWrNZcAfddrLPLPfwyjfnSL60HbH9qkjC1e6cG7ov0W+iyu5M/GPCXmeVheASnn49DhHQ7AHzOc5XX8b6UgSvnQHxnTkZmHsgxtmougrtrNc+SMV5KzF0KnWZlnF1pcH/LdYdpUpV5bwHcGwbx5mrOWvW2zMz3sDlRY/Vd7IAjZtAx45kWuYrJmgvYX1lFsG+AsllcXKrngNLj+0Bl9hzrKmxdnHOdZZaDfD8GsTQGct1YL85wbCieik5PMfxFybUtE2lpLclFPltZ/yyGk8Hy7brubpcD+G45FYgHoOG8swm9JkLZnrbN0Oe8tRdsndgrEBThnJD3pqPA/Dy1XR6S0iObN2RZ3miZ9atc/eywFwmkFAK+mEvImwC9g8+y13aHDi9vJ0Nl35fWOhDsrfrPRDi5t3LfQQkq49M7hT7hGuDcrg+42+xF5AZNGobDfcy68CT2yzhFpooyxT5DBjSpxPbqZNTzjy3bLk9hTr47w+wcBy5mRlxONkPA/DroHeccmtc/2+Qq2HDfxofzGNrqu5EbmVZ6/qWWqDTGyaH3LB3HqPhDZrRTfysI/cSLuS3Of8cDV91DF3AKozJZ30nSszHQLe2Zdp7XeujFGZy9DoPW7D2k+ukLd7k9B5FhDzFyR/Uymua5BGoyyZm/C8D9DW/2fxFYlt3dQxHwMcx8jHRmP25FcK6RITcRs0TKovxaftWZYFjGzvgw/ZvTt22SXMfjUer+GIDx8mvW4eR0l8zj4BLl/TiypmyNyM2nzJ4uF1JdxOcZT5O0yLDZbR36i59RQmubtDCNRSTcTKNprjIZiflcHw5/Wk6lYq1NmEGzdwrRj4TFqzaLxnuGJ/uLrQWkWif9lgPBG2HDmrbLB6FfS/du6DqRi6qPS7oibTuODHJ28H8pkJ9xdP2X7nC0h+sj5A3G6M9H9Pw8yc4lWKwEjYwFCNmFeaFbq9f+0COFjiGxt+OeOUP5MiHZqRdRyxN+RZNoRJ2djq9D+fjK4Iik0g4k+QdpBz1OL3F9cHf9S8BPg7RZpeViR9pLJTA+p+gFrBOk/suA5V4ELvM61yJiaMrHrrNnHEssmLg+xWwB25W6+i/AsBTsWyPS3C/G3FwBPn8Ge6RYG4WbfuhT/zStak4nA/DSfpHTLRP+8DgGcfwC9B9qcmHzrb2nJZwNQ6Y2xPDH6R+Bi2dR8M5Q7lH5NO0cF3Nn5t/S+1GVg5+zgAA7DJFOrvnXwQ+n+F7HC0HupcAAAAASUVORK5CYII=" className={` ${imageSizeClasses}`} />
                </button>
            </div>
        </div>
    );
}

export default InputBar;
