import { Container } from "@mui/material";
import React, { useState } from "react";
import { Toast } from "../../components/common/Toast";
// packages
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaPlus } from "react-icons/fa6";
import { CreatePageApi, uploadImageApi } from "../../api/api";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

const imageCompressOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export default function AddPage() {
  const navigate = useNavigate();

  let camera = "https://i.ibb.co/yy0WSVg/Group-1098.png";
  // state
  const [isLoading, setIsLoading] = useState(false);
  const [pageData, setPageData] = useState({});
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(""))
  );
  const [content, setContent] = useState("");
  const [iconImages, setIconImages] = useState({
    icon1: null,
    icon2: null,
    icon3: null,
    icon4: null,
  });

  // function
  const handleSubmit = async (e) => {
    e.preventDefault();
    let iconUrls = [];
    pageData.description = content;
    if (!pageData.bannerImage)
      return Toast.fire({
        icon: "error",
        title: "Please select a banner image",
        position: "bottom-end",
      });
    if (pageData.description === "")
      return Toast.fire({
        icon: "error",
        title: "Please enter description",
        position: "bottom-end",
      });
    setIsLoading(true);
    const res = await uploadImageApi({ file: pageData.bannerImage });
    if (res.error) {
      Toast.fire({
        icon: "error",
        title: res?.message || "Something went wrong",
        position: "bottom-end",
      });
      setIsLoading(false);
      return;
    } else {
      for (const key in iconImages) {
        if (iconImages[key]) {
          const res = await uploadImageApi({ file: iconImages[key] });
          if (res.error) {
            Toast.fire({
              icon: "error",
              title: res?.message || "Something went wrong",
              position: "bottom-end",
            });
          } else {
            iconUrls.push(res?.secure_url);
          }
        }
      }
    }

    //  add this key to pageData
    pageData.banner = res?.secure_url;
    pageData.icons = iconUrls;

    // remove bannerImage key
    delete pageData.bannerImage;

    const response = await CreatePageApi(pageData);
    if (response.error) {
      Toast.fire({
        icon: "error",
        title: response?.message || "Something went wrong",
        position: "bottom-end",
      });
      setIsLoading(false);
      return;
    } else {
      Toast.fire({
        icon: "success",
        title: "Page created successfully",
        position: "bottom-end",
      });
      setIsLoading(false);
      navigate("/admin-panel/pages");
    }
  };

  const handlePickFile = (id) => {
    const bannerInput = document.getElementById(id);
    bannerInput.click();
  };

  const handleChange = async (e) => {
    if (e.target.files[0]) {
      let size = e.target.files[0].size / 1024 / 1024;
      console.log(size);
      // if (size >= 1) {
      //   Toast.fire({
      //     icon: "error",
      //     title: "File size is too large",
      //   });
      //   return;
      // }
      try {
        const compressedFile = await imageCompression(
          e.target.files[0],
          imageCompressOptions
        );
        let compressedSize = compressedFile.size / 1024 / 1024;

        console.log("compressedFile", compressedSize);

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
          setPageData({ ...pageData, bannerImage: reader.result });
        };
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleIconChange = async (e, iconNumber) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      let size = e.target.files[0].size / 1024 / 1024;
      if (size >= 1) {
        Toast.fire({
          icon: "error",
          title: "File size is too large",
        });
        return;
      }
      try {
        const compressedFile = await imageCompression(
          file,
          imageCompressOptions
        );
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setIconImages({ ...iconImages, [iconNumber]: reader.result });
        };
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleTextChange = (state) => {
    setEditorState(state);
    let data = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setContent(data);
  };
  return (
    <Container>
      <div className="rounded-lg bg-white mt-6 border-lightgray">
        <div className="py-4 border-b">
          <div>
            <h1 className="font-bold text-2xl text-center">Add Page</h1>
            <div />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="m-4">
          <div>
            <label className="label" htmlFor="page-title">
              Page Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Page Title"
              className="input"
              onChange={(e) =>
                setPageData({ ...pageData, title: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="label" htmlFor="page-title">
              Slug
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="For example: about-us"
              className="input"
              onChange={(e) =>
                setPageData({ ...pageData, slug: e.target.value })
              }
              required
            />
          </div>

          <div className="cursor-pointer mb-4">
            <label className="label" htmlFor="page-title">
              Banner Image
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <img
                src={
                  pageData?.bannerImage
                    ? pageData?.bannerImage
                    : "https://i.ibb.co/GWKX35N/Group-1247.png"
                }
                alt=""
                className="w-full rounded-lg h-[200px]
                md:h-[450px] lg:h-[550px] xl:h-[650px]"
                onClick={
                  !pageData?.bannerImage
                    ? () => handlePickFile("banner-image")
                    : null
                }
              />
              {pageData?.bannerImage && (
                <div
                  className="absolute bottom-2 right-2"
                  onClick={() => handlePickFile("banner-image")}
                >
                  <img src={camera} alt="" className="w-[50px] h-[50px]" />
                </div>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              id="banner-image"
              onChange={handleChange}
              accept="image/jpeg"
            />
          </div>
          <Editor
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class editor_class_1"
            toolbarClassName="toolbar-class"
            onEditorStateChange={handleTextChange}
            placeholder={`Type Description`}
          />
          <label>
            Icon Images
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4].map((iconNumber) => (
              <div key={iconNumber} className="mr-4">
                <div
                  className="w-[30px] h-[30px] rounded-full flex justify-center items-center border border-[#3c7fff]"
                  onClick={() => handlePickFile(`icon${iconNumber}`)}
                >
                  {iconImages[`icon${iconNumber}`] ? (
                    <img
                      src={iconImages[`icon${iconNumber}`]}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FaPlus className="text-[#3c7fff]" />
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => handleIconChange(e, `icon${iconNumber}`)}
                  accept="image/*"
                  id={`icon${iconNumber}`}
                />
              </div>
            ))}
          </div>
          <button
            className="h-[40px] md:h-[48px] w-full bg-[#3c7fff] hover:bg-indigo-800 rounded-lg text-white flex justify-center items-center mt-8"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
}
