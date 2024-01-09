

/*
# Word Gallery - Photo.jsx
- author: "Joel Cruz",
- email: "jcruz@axaeon.com",
- description: "Project 7: End-of-unit project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse (Code Academy).",
- codename: "7t",
--------------------------------------------------------------------------------------------------*/

/**
 * ## Photo Component
 * - Renders a Photo-Component from provided path- and description-string
 * @param {Object} props
 * @param {string} props.path - URL path for the image
 * @param {string} props.desc - Description for the image
 * @returns {React.ReactNode} JSX.Element: Displays an image with specified path and description
 */
function Photo({path, desc}) {

  return (
    <li><img src={path} alt={desc} /></li>
  );
};

export default Photo

