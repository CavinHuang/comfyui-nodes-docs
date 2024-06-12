---
tags:
- Batch
- Image
- ImageBatch
---

# Load Image Batch
## Documentation
- Class name: `Load Image Batch`
- Category: `WAS Suite/IO`
- Output node: `False`

The Load Image Batch node is designed to aggregate multiple images into a single batch tensor. It dynamically combines input images based on provided parameters, facilitating operations that require batch processing of images.
## Input types
### Required
- **`mode`**
    - Specifies the loading mode, which can be single or multiple images, affecting how images are aggregated into the batch.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`index`**
    - Determines the starting index for image loading, enabling partial or staggered batch processing.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`label`**
    - Assigns a label to the loaded batch, useful for identification and tracking purposes.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`path`**
    - Specifies the directory path where images are located, serving as the source for batch loading.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pattern`**
    - Defines the pattern used to match filenames within the specified path, allowing for selective loading of images.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`allow_RGBA_output`**
    - Controls whether RGBA images are allowed in the output batch, accommodating images with transparency.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`filename_text_extension`**
    - Determines whether the filename extension is included in the output, affecting the representation of image names.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The aggregated batch of images, represented as a tensor, ready for further processing or analysis.
    - Python dtype: `torch.Tensor`
- **`filename_text`**
    - Comfy dtype: `STRING`
    - The text representation of filenames included in the batch, useful for tracking and identification of individual images.
    - Python dtype: `List[str]`
## Usage tips
- Infra type: `GPU`
- Common nodes:
    - Reroute
    - [BLIPCaption](../../comfyui-art-venture/Nodes/BLIPCaption.md)
    - Image scale to side



## Source code
```python
class WAS_Load_Image_Batch:
    def __init__(self):
        self.HDB = WASDatabase(WAS_HISTORY_DATABASE)

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mode": (["single_image", "incremental_image", "random"],),
                "index": ("INT", {"default": 0, "min": 0, "max": 150000, "step": 1}),
                "label": ("STRING", {"default": 'Batch 001', "multiline": False}),
                "path": ("STRING", {"default": '', "multiline": False}),
                "pattern": ("STRING", {"default": '*', "multiline": False}),
                "allow_RGBA_output": (["false","true"],),
            },
            "optional": {
                "filename_text_extension": (["true", "false"],),
            }
        }

    RETURN_TYPES = ("IMAGE",TEXT_TYPE)
    RETURN_NAMES = ("image","filename_text")
    FUNCTION = "load_batch_images"

    CATEGORY = "WAS Suite/IO"

    def load_batch_images(self, path, pattern='*', index=0, mode="single_image", label='Batch 001', allow_RGBA_output='false', filename_text_extension='true'):

        allow_RGBA_output = (allow_RGBA_output == 'true')

        if not os.path.exists(path):
            return (None, )
        fl = self.BatchImageLoader(path, label, pattern)
        new_paths = fl.image_paths
        if mode == 'single_image':
            image, filename = fl.get_image_by_id(index)
            if image == None:
                cstr(f"No valid image was found for the inded `{index}`").error.print()
                return (None, None)
        elif mode == 'incremental_image':
            image, filename = fl.get_next_image()
            if image == None:
                cstr(f"No valid image was found for the next ID. Did you remove images from the source directory?").error.print()
                return (None, None)
        else:
            newindex = int(random.random() * len(fl.image_paths))
            image, filename = fl.get_image_by_id(newindex)
            if image == None:
                cstr(f"No valid image was found for the next ID. Did you remove images from the source directory?").error.print()
                return (None, None)


        # Update history
        update_history_images(new_paths)

        if not allow_RGBA_output:
           image = image.convert("RGB")

        if filename_text_extension == "false":
            filename = os.path.splitext(filename)[0]

        return (pil2tensor(image), filename)

    class BatchImageLoader:
        def __init__(self, directory_path, label, pattern):
            self.WDB = WDB
            self.image_paths = []
            self.load_images(directory_path, pattern)
            self.image_paths.sort()
            stored_directory_path = self.WDB.get('Batch Paths', label)
            stored_pattern = self.WDB.get('Batch Patterns', label)
            if stored_directory_path != directory_path or stored_pattern != pattern:
                self.index = 0
                self.WDB.insert('Batch Counters', label, 0)
                self.WDB.insert('Batch Paths', label, directory_path)
                self.WDB.insert('Batch Patterns', label, pattern)
            else:
                self.index = self.WDB.get('Batch Counters', label)
            self.label = label

        def load_images(self, directory_path, pattern):
            for file_name in glob.glob(os.path.join(glob.escape(directory_path), pattern), recursive=True):
                if file_name.lower().endswith(ALLOWED_EXT):
                    abs_file_path = os.path.abspath(file_name)
                    self.image_paths.append(abs_file_path)

        def get_image_by_id(self, image_id):
            if image_id < 0 or image_id >= len(self.image_paths):
                cstr(f"Invalid image index `{image_id}`").error.print()
                return
            i = Image.open(self.image_paths[image_id])
            i = ImageOps.exif_transpose(i)
            return (i, os.path.basename(self.image_paths[image_id]))

        def get_next_image(self):
            if self.index >= len(self.image_paths):
                self.index = 0
            image_path = self.image_paths[self.index]
            self.index += 1
            if self.index == len(self.image_paths):
                self.index = 0
            cstr(f'{cstr.color.YELLOW}{self.label}{cstr.color.END} Index: {self.index}').msg.print()
            self.WDB.insert('Batch Counters', self.label, self.index)
            i = Image.open(image_path)
            i = ImageOps.exif_transpose(i)
            return (i, os.path.basename(image_path))

        def get_current_image(self):
            if self.index >= len(self.image_paths):
                self.index = 0
            image_path = self.image_paths[self.index]
            return os.path.basename(image_path)

    @classmethod
    def IS_CHANGED(cls, **kwargs):
        if kwargs['mode'] != 'single_image':
            return float("NaN")
        else:
            fl = WAS_Load_Image_Batch.BatchImageLoader(kwargs['path'], kwargs['label'], kwargs['pattern'])
            filename = fl.get_current_image()
            image = os.path.join(kwargs['path'], filename)
            sha = get_sha256(image)
            return sha

```
