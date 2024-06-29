---
tags:
- Image
---

# 💾 CR Image Output
## Documentation
- Class name: `CR Image Output`
- Category: `🧩 Comfyroll Studio/✨ Essential/📦 Core`
- Output node: `True`

The CR Image Output node is designed to facilitate the output of images within a computational graph, providing a streamlined way to export, display, or further process images generated or modified by preceding nodes. It abstracts the complexities involved in handling image data, ensuring that images are appropriately formatted and ready for use or display.
## Input types
### Required
- **`images`**
    - The 'images' parameter represents the image data to be outputted. It plays a crucial role in determining the content and format of the output, affecting how images are processed and presented in the final output.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`output_type`**
    - Specifies the type of output operation to perform with the images, such as saving to disk or displaying.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`filename_prefix`**
    - A prefix to be added to the filenames of saved images, allowing for organized and identifiable output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`prefix_presets`**
    - Predefined prefix options that can be selected for convenience and standardization.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `List[str]`
- **`file_format`**
    - The format in which the images will be saved, such as PNG or JPEG.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`trigger`**
    - A control signal that triggers the output operation, ensuring that images are processed and saved/displayed at the correct time.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`trigger`**
    - Comfy dtype: `BOOLEAN`
    - Indicates the completion of the output operation, potentially used to trigger subsequent nodes in the computational graph.
    - Python dtype: `bool`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class CR_ImageOutput:
    def __init__(self):
        self.output_dir = folder_paths.get_output_directory()
        self.type = "output"

    @classmethod
    def INPUT_TYPES(cls):
    
        presets = ["None", "yyyyMMdd"]
    
        return {"required": 
                    {"images": ("IMAGE", ),
                     "output_type": (["Preview", "Save", "UI (no batch)"],),
                     "filename_prefix": ("STRING", {"default": "CR"}),
                     "prefix_presets": (presets, ),
                     "file_format": (["png", "jpg", "webp", "tif"],),
                    },
                "hidden": {"prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"},
                "optional": 
                    {"trigger": ("BOOLEAN", {"default": False},),
                    }
                }

    RETURN_TYPES = ("BOOLEAN", )
    RETURN_NAMES = ("trigger", )
    FUNCTION = "save_images"
    OUTPUT_NODE = True
    CATEGORY = icons.get("Comfyroll/Essential/Core")

    def save_images(self, images, file_format, prefix_presets, filename_prefix="CR",
        trigger=False, output_type="Preview", prompt=None, extra_pnginfo=None):
              
        show_help = "https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes/wiki/Core-Nodes#cr-image-output"
    
        def map_filename(filename):
            prefix_len = len(os.path.basename(filename_prefix))
            prefix = filename[:prefix_len + 1]
            try:
                digits = int(filename[prefix_len + 1:].split('_')[0])
            except:
                digits = 0
            return (digits, prefix)

        if output_type == "Save":
            self.output_dir = folder_paths.get_output_directory()
            self.type = "output"
        elif output_type == "Preview":
            self.output_dir = folder_paths.get_temp_directory()
            self.type = "temp"
     
        date_formats = {
            'yyyyMMdd': lambda d: '{}{:02d}{:02d}'.format(str(d.year), d.month, d.day),
        }
        
        current_datetime = datetime.datetime.now()

        for format_key, format_lambda in date_formats.items(): 
            preset_prefix = f"{format_lambda(current_datetime)}"
        
        if prefix_presets != "None":
            filename_prefix = filename_prefix + "_" + preset_prefix

        if filename_prefix[0] == "_":
            filename_prefix = filename_prefix[1:]            

        subfolder = os.path.dirname(os.path.normpath(filename_prefix))
        filename = os.path.basename(os.path.normpath(filename_prefix))

        full_output_folder = os.path.join(self.output_dir, subfolder)

        if os.path.commonpath((self.output_dir, os.path.abspath(full_output_folder))) != self.output_dir:
            return {}

        try:
            counter = max(filter(lambda a: a[1][:-1] == filename and a[1][-1] == "_", map(map_filename, os.listdir(full_output_folder))))[0] + 1
        except ValueError:
            counter = 1
        except FileNotFoundError:
            os.makedirs(full_output_folder, exist_ok=True)
            counter = 1

        if output_type == "UI (no batch)":
            # based on ETN_SendImageWebSocket
            results = []
            for tensor in images:
                array = 255.0 * tensor.cpu().numpy()
                image = Image.fromarray(np.clip(array, 0, 255).astype(np.uint8))

                server = PromptServer.instance
                server.send_sync(
                    BinaryEventTypes.UNENCODED_PREVIEW_IMAGE,
                    ["PNG", image, None],
                    server.client_id,
                )
                results.append(
                    {"source": "websocket", "content-type": "image/png", "type": "output"}
                )
            return {"ui": {"images": results}}
        else:           
            results = list()
            for image in images:
                i = 255. * image.cpu().numpy()
                img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))
                metadata = PngInfo()
                if prompt is not None:
                    metadata.add_text("prompt", json.dumps(prompt))
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        metadata.add_text(x, json.dumps(extra_pnginfo[x]))

                file_name = f"{filename}_{counter:05}_.{file_format}"
                
                img_params = {'png': {'compress_level': 4}, 
                              'webp': {'method': 6, 'lossless': False, 'quality': 80},
                              'jpg': {'format': 'JPEG'},
                              'tif': {'format': 'TIFF'}
                             }
                
                resolved_image_path = os.path.join(full_output_folder, file_name)
                
                img.save(resolved_image_path, **img_params[file_format], pnginfo=metadata)
                results.append({
                    "filename": file_name,
                    "subfolder": subfolder,
                    "type": self.type
                })
                counter += 1

            return { "ui": { "images": results }, "result": (trigger, show_help,) }

```
