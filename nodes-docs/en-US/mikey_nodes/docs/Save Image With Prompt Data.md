---
tags:
- Image
- ImageSave
---

# Save Image With Prompt Data
## Documentation
- Class name: `Save Image With Prompt Data`
- Category: `Mikey/Image`
- Output node: `True`

This node is designed to save images along with associated prompt data and additional PNG metadata. It encapsulates the functionality to embed prompt information and other relevant metadata directly into the PNG files, facilitating a seamless integration of image content with descriptive data. The node aims to enhance the utility and interpretability of saved images by embedding contextual information, making it easier for users to understand and manage their image collections.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the collection of images to be saved. It is crucial for specifying the visual content that will be embedded with prompt data and additional metadata, serving as the primary input for the node's operation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`positive_prompt`**
    - The 'positive_prompt' parameter enables the inclusion of positive prompt information as part of the image's metadata, offering insights into the desired attributes or themes of the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`negative_prompt`**
    - The 'negative_prompt' parameter allows for the inclusion of negative prompt information, specifying undesired attributes or themes to avoid in the images, enriching the contextual data.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_prefix`**
    - The 'filename_prefix' parameter allows users to specify a prefix for the filenames of the saved images. This aids in organizing and identifying images within a collection, providing a customizable naming convention that reflects the content or context of the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`parameters`**
    - The 'parameters' parameter permits the inclusion of additional parameters as part of the image's metadata, further customizing the metadata content and enhancing the descriptive data of the images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`ui`**
    - The 'ui' parameter contains the results of the image saving operation, including details such as filenames and subfolders of the saved images. It provides a structured response that facilitates the management and retrieval of saved images.
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImagesMikey:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"images": ("IMAGE", ),
                     "positive_prompt": ("STRING", {'default': 'Positive Prompt'}),
                     "negative_prompt": ("STRING", {'default': 'Negative Prompt'}),
                     "filename_prefix": ("STRING", {"default": ""}),
                     "parameters": ("STRING", {"default": ""}),},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ()
    #RETURN_NAMES = ('filename',)
    FUNCTION = "save_images"
    OUTPUT_NODE = True
    CATEGORY = "Mikey/Image"

    #@classmethod
    #def IS_CHANGED(self, images):
    #    return (np.nan,)

    def save_images(self, images, filename_prefix='', parameters='', prompt=None, extra_pnginfo=None, positive_prompt='', negative_prompt=''):
        filename_prefix = search_and_replace(filename_prefix, extra_pnginfo, prompt)
        full_output_folder, filename, counter, subfolder, filename_prefix = get_save_image_path(filename_prefix, self.output_dir, images[0].shape[1], images[0].shape[0])
        results = list()
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = PngInfo()
            pos_trunc = ''
            if prompt is not None:
                metadata.add_text("prompt", json.dumps(prompt))
            if extra_pnginfo is not None:
                for x in extra_pnginfo:
                    if x == 'parameters':
                        # encode text as utf-8
                        text = extra_pnginfo[x].encode('utf-8').decode('utf-8')
                        metadata.add_text(x, text)
                    elif x == 'workflow':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    elif x == 'prompt':
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                    else:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x], ensure_ascii=False))
            if positive_prompt:
                #metadata.add_text("positive_prompt", json.dumps(positive_prompt, ensure_ascii=False))
                metadata.add_text("positive_prompt", positive_prompt)
                # replace any special characters with nothing and spaces with _
                clean_pos = re.sub(r'[^a-zA-Z0-9 ]', '', positive_prompt)
                pos_trunc = clean_pos.replace(' ', '_')[0:80]
            if negative_prompt:
                #metadata.add_text("negative_prompt", json.dumps(negative_prompt, ensure_ascii=False))
                metadata.add_text("negative_prompt", negative_prompt)
            if filename_prefix != '':
                clean_filename_prefix = re.sub(r'[^a-zA-Z0-9 _-]', '', filename_prefix)
                metadata.add_text("filename_prefix", json.dumps(clean_filename_prefix, ensure_ascii=False))
                file = f"{clean_filename_prefix[:75]}_{counter:05}_.png"
            else:
                ts_str = datetime.datetime.now().strftime("%y%m%d%H%M%S")
                file = f"{ts_str}_{pos_trunc}_{filename}_{counter:05}_.png"
            if parameters:
                metadata.add_text("parameters", parameters)
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
            results.append({
                "filename": file,
                "subfolder": subfolder,
                "type": self.type
            })
            counter += 1

        return { "ui": { "images": results } }

```
