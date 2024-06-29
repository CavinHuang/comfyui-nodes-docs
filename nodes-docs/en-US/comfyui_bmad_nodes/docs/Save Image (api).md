---
tags:
- Image
- ImageSave
---

# Save Image (api)
## Documentation
- Class name: `Save Image (api)`
- Category: `Bmad/api`
- Output node: `False`

The SaveImage node is designed to save images to a specified output directory without storing any metadata, using a unique hexdigest as the filename. It is primarily used in workflows that require the output images to be stored temporarily before being sent to another process for further handling.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the collection of images to be saved. It plays a crucial role in determining the content that will be stored in the output directory.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`resource_name`**
    - The 'resource_name' parameter specifies the prefix for the saved image filenames, allowing for easy identification and categorization of the output files.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`task_done`**
    - Comfy dtype: `TASK_DONE`
    - Indicates the completion of the image saving process, signaling that the images have been successfully stored in the output directory.
    - Python dtype: `tuple`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class SaveImage2:
    """
    Saves image without storing any metadata using a hexdigest as the name.
    Outputs from these nodes should be sent to SetRequestStateToComplete.
    """

    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(s):
        return {"required":
                    {"images": ("IMAGE",),
                     "resource_name": ("STRING", {"default": "image"})},
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                }

    RETURN_TYPES = ("TASK_DONE",)
    FUNCTION = "save_images"

    CATEGORY = "Bmad/api"

    def save_images(self, images, resource_name="image", prompt=None, extra_pnginfo=None):
        def build_hashcode(data):
            if isinstance(data, str):
                data = data.encode(encoding='UTF-8', errors='strict')
            hash_object = hashlib.sha256()
            hash_object.update(data)
            return hash_object.hexdigest()

        req_id = CreateRequestMetadata.get_and_validate_requestID()
        hexdigest = build_hashcode(req_id + resource_name)

        def map_filename(filename):
            prefix_len = len(os.path.basename(hexdigest))
            prefix = filename[:prefix_len + 1]
            try:
                digits = int(filename[prefix_len + 1:].split('_')[0])
            except:
                digits = 0
            return (digits, prefix)

        subfolder = os.path.dirname(os.path.normpath(hexdigest))
        filename = os.path.basename(os.path.normpath(hexdigest))

        full_output_folder = os.path.join(self.output_dir, subfolder)

        if os.path.commonpath((self.output_dir, os.path.abspath(full_output_folder))) != self.output_dir:
            print("Saving image outside the output folder is not allowed.")
            return {}

        try:
            counter = max(filter(lambda a: a[1][:-1] == filename and a[1][-1] == "_",
                                 map(map_filename, os.listdir(full_output_folder))))[0] + 1
        except ValueError:
            counter = 1
        except FileNotFoundError:
            os.makedirs(full_output_folder, exist_ok=True)
            counter = 1

        # results = list()
        files = list()
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
            metadata = PngInfo()
            # if save_meta_data: TODO add an option for this
            #   if prompt is not None:
            #       metadata.add_text("prompt", json.dumps(prompt))
            #   if extra_pnginfo is not None:
            #       for x in extra_pnginfo:
            #           metadata.add_text(x, json.dumps(extra_pnginfo[x]))

            file = f"{filename}_{counter:05}_.png"
            img.save(os.path.join(full_output_folder, file), pnginfo=metadata, compress_level=4)
            files.append(file)
            # results.append({
            #    "filename": file,
            #    "subfolder": subfolder,
            #    "type": self.type
            # });
            counter += 1

        CreateRequestMetadata.add_resource_list(resource_name, files)
        return (resource_name,)  # { "ui": { "images": results } }

```
