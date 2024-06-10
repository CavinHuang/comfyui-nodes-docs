---
tags:
- Image
- ImageSave
---

# Image Save
## Documentation
- Class name: `Image Save`
- Category: `WAS Suite/IO`
- Output node: `True`

The `Image Save` node is designed for saving a collection of images to a specified directory, with options for naming, formatting, and additional metadata. It provides flexibility in how images are stored, including support for history tracking and embedding workflow information within the saved files.
## Input types
### Required
- **`images`**
    - A collection of images to be saved. This parameter is central to the node's operation, determining the content that will be stored on disk.
    - Comfy dtype: `IMAGE`
    - Python dtype: `List[torch.Tensor]`
- **`output_path`**
    - The directory where the images will be saved. It allows for organizing saved images in a structured manner.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_prefix`**
    - A prefix added to the filenames of saved images, aiding in their identification and categorization.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_delimiter`**
    - The delimiter used between the filename prefix and the numbering in the saved file names, aiding in file organization and readability.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`filename_number_padding`**
    - The number of digits to use for numbering files, ensuring consistent filename lengths and facilitating sorting.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`filename_number_start`**
    - The starting number for filename numbering, enabling sequential organization of saved images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`extension`**
    - The file format in which the images will be saved, such as PNG or JPEG, affecting the image's quality and compatibility.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`quality`**
    - The quality setting for saved images, applicable to formats like JPEG. It influences the balance between file size and image fidelity.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`lossless_webp`**
    - A flag indicating whether to save images in the WebP format with lossless compression, optimizing for image quality preservation.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`overwrite_mode`**
    - Controls how the node handles existing files with the same name, allowing for overwriting, skipping, or generating unique names.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`show_history`**
    - A flag to display the saving history of images, providing insights into the node's operation over time.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`show_history_by_prefix`**
    - Determines whether to group and display image saving history by filename prefix, aiding in the review of related images.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`embed_workflow`**
    - A flag to embed workflow information within saved images, linking them to their generation context.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`show_previews`**
    - Enables the display of image previews during the saving process, offering immediate visual feedback.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
The node doesn't have output types
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Save:
    def __init__(self):
        self.output_dir = comfy_paths.output_directory
        self.type = 'output'
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE", ),
                "output_path": ("STRING", {"default": '[time(%Y-%m-%d)]', "multiline": False}),
                "filename_prefix": ("STRING", {"default": "ComfyUI"}),
                "filename_delimiter": ("STRING", {"default":"_"}),
                "filename_number_padding": ("INT", {"default":4, "min":1, "max":9, "step":1}),
                "filename_number_start": (["false", "true"],),
                "extension": (['png', 'jpg', 'jpeg', 'gif', 'tiff', 'webp', 'bmp'], ),
                "quality": ("INT", {"default": 100, "min": 1, "max": 100, "step": 1}),
                "lossless_webp": (["false", "true"],),
                "overwrite_mode": (["false", "prefix_as_filename"],),
                "show_history": (["false", "true"],),
                "show_history_by_prefix": (["true", "false"],),
                "embed_workflow": (["true", "false"],),
                "show_previews": (["true", "false"],),
            },
            "hidden": {
                "prompt": "PROMPT", "extra_pnginfo": "EXTRA_PNGINFO"
            },
        }

    RETURN_TYPES = ()
    FUNCTION = "was_save_images"

    OUTPUT_NODE = True

    CATEGORY = "WAS Suite/IO"

    def was_save_images(self, images, output_path='', filename_prefix="ComfyUI", filename_delimiter='_',
                        extension='png', quality=100, lossless_webp="false", prompt=None, extra_pnginfo=None,
                        overwrite_mode='false', filename_number_padding=4, filename_number_start='false',
                        show_history='false', show_history_by_prefix="true", embed_workflow="true",
                        show_previews="true"):

        delimiter = filename_delimiter
        number_padding = filename_number_padding
        lossless_webp = (lossless_webp == "true")

        # Define token system
        tokens = TextTokens()

        original_output = self.output_dir
        # Parse prefix tokens
        filename_prefix = tokens.parseTokens(filename_prefix)

        # Setup output path
        if output_path in [None, '', "none", "."]:
            output_path = self.output_dir
        else:
            output_path = tokens.parseTokens(output_path)
        if not os.path.isabs(output_path):
            output_path = os.path.join(self.output_dir, output_path)
        base_output = os.path.basename(output_path)
        if output_path.endswith("ComfyUI/output") or output_path.endswith("ComfyUI\output"):
            base_output = ""

        # Check output destination
        if output_path.strip() != '':
            if not os.path.isabs(output_path):
                output_path = os.path.join(comfy_paths.output_directory, output_path)
            if not os.path.exists(output_path.strip()):
                cstr(f'The path `{output_path.strip()}` specified doesn\'t exist! Creating directory.').warning.print()
                os.makedirs(output_path, exist_ok=True)

        # Find existing counter values
        if filename_number_start == 'true':
            pattern = f"(\\d+){re.escape(delimiter)}{re.escape(filename_prefix)}"
        else:
            pattern = f"{re.escape(filename_prefix)}{re.escape(delimiter)}(\\d+)"
        existing_counters = [
            int(re.search(pattern, filename).group(1))
            for filename in os.listdir(output_path)
            if re.match(pattern, os.path.basename(filename))
        ]
        existing_counters.sort(reverse=True)

        # Set initial counter value
        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1

        # Set initial counter value
        if existing_counters:
            counter = existing_counters[0] + 1
        else:
            counter = 1

        # Set Extension
        file_extension = '.' + extension
        if file_extension not in ALLOWED_EXT:
            cstr(f"The extension `{extension}` is not valid. The valid formats are: {', '.join(sorted(ALLOWED_EXT))}").error.print()
            file_extension = "png"

        results = list()
        for image in images:
            i = 255. * image.cpu().numpy()
            img = Image.fromarray(np.clip(i, 0, 255).astype(np.uint8))

            # Delegate metadata/pnginfo
            if extension == 'webp':
                img_exif = img.getexif()
                workflow_metadata = ''
                prompt_str = ''
                if prompt is not None:
                    prompt_str = json.dumps(prompt)
                    img_exif[0x010f] = "Prompt:" + prompt_str
                if extra_pnginfo is not None:
                    for x in extra_pnginfo:
                        workflow_metadata += json.dumps(extra_pnginfo[x])
                img_exif[0x010e] = "Workflow:" + workflow_metadata
                exif_data = img_exif.tobytes()
            else:
                metadata = PngInfo()
                if embed_workflow == 'true':
                    if prompt is not None:
                        metadata.add_text("prompt", json.dumps(prompt))
                    if extra_pnginfo is not None:
                        for x in extra_pnginfo:
                            metadata.add_text(x, json.dumps(extra_pnginfo[x]))
                exif_data = metadata

            # Delegate the filename stuffs
            if overwrite_mode == 'prefix_as_filename':
                file = f"{filename_prefix}{file_extension}"
            else:
                if filename_number_start == 'true':
                    file = f"{counter:0{number_padding}}{delimiter}{filename_prefix}{file_extension}"
                else:
                    file = f"{filename_prefix}{delimiter}{counter:0{number_padding}}{file_extension}"
                if os.path.exists(os.path.join(output_path, file)):
                    counter += 1

            # Save the images
            try:
                output_file = os.path.abspath(os.path.join(output_path, file))
                if extension in ["jpg", "jpeg"]:
                    img.save(output_file,
                             quality=quality, optimize=True)
                elif extension == 'webp':
                    img.save(output_file,
                             quality=quality, lossless=lossless_webp, exif=exif_data)
                elif extension == 'png':
                    img.save(output_file,
                             pnginfo=exif_data, optimize=True)
                elif extension == 'bmp':
                    img.save(output_file)
                elif extension == 'tiff':
                    img.save(output_file,
                             quality=quality, optimize=True)
                else:
                    img.save(output_file,
                             pnginfo=exif_data, optimize=True)

                cstr(f"Image file saved to: {output_file}").msg.print()

                if show_history != 'true' and show_previews == 'true':
                    subfolder = self.get_subfolder_path(output_file, original_output)
                    results.append({
                        "filename": file,
                        "subfolder": subfolder,
                        "type": self.type
                    })

                # Update the output image history
                update_history_output_images(output_file)

            except OSError as e:
                cstr(f'Unable to save file to: {output_file}').error.print()
                print(e)
            except Exception as e:
                cstr('Unable to save file due to the to the following error:').error.print()
                print(e)

            if overwrite_mode == 'false':
                counter += 1

        filtered_paths = []
        if show_history == 'true' and show_previews == 'true':
            HDB = WASDatabase(WAS_HISTORY_DATABASE)
            conf = getSuiteConfig()
            if HDB.catExists("History") and HDB.keyExists("History", "Output_Images"):
                history_paths = HDB.get("History", "Output_Images")
            else:
                history_paths = None

            if history_paths:

                for image_path in history_paths:
                    image_subdir = self.get_subfolder_path(image_path, self.output_dir)
                    current_subdir = self.get_subfolder_path(output_file, self.output_dir)
                    if not os.path.exists(image_path):
                        continue
                    if show_history_by_prefix == 'true' and image_subdir != current_subdir:
                        continue
                    if show_history_by_prefix == 'true' and not os.path.basename(image_path).startswith(filename_prefix):
                        continue
                    filtered_paths.append(image_path)

                if conf.__contains__('history_display_limit'):
                    filtered_paths = filtered_paths[-conf['history_display_limit']:]

                filtered_paths.reverse()

        if filtered_paths:
            for image_path in filtered_paths:
                subfolder = self.get_subfolder_path(image_path, self.output_dir)
                image_data = {
                    "filename": os.path.basename(image_path),
                    "subfolder": subfolder,
                    "type": self.type
                }
                results.append(image_data)

        if show_previews == 'true':
            return {"ui": {"images": results}}
        else:
            return {"ui": {"images": []}}

    def get_subfolder_path(self, image_path, output_path):
        output_parts = output_path.strip(os.sep).split(os.sep)
        image_parts = image_path.strip(os.sep).split(os.sep)
        common_parts = os.path.commonprefix([output_parts, image_parts])
        subfolder_parts = image_parts[len(common_parts):]
        subfolder_path = os.sep.join(subfolder_parts[:-1])
        return subfolder_path

```
