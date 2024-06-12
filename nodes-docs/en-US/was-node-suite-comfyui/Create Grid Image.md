---
tags:
- GridLayout
- Image
- Tiled
---

# Create Grid Image
## Documentation
- Class name: `Create Grid Image`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to create a grid image from a collection of image files. It allows for customization of the grid layout, including the number of columns, cell size, and border properties. The node supports filtering images by file extension and can include images from subfolders based on the user's choice.
## Input types
### Required
- **`images_path`**
    - The path to the directory containing the images to be included in the grid. The node checks for the existence of this path and filters images based on allowed extensions.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`pattern_glob`**
    - A glob pattern to filter the images in the specified path. It allows for more granular control over which images are included based on their filenames.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`include_subfolders`**
    - A flag indicating whether to include images from subdirectories of the specified path. This allows for recursive image inclusion based on the user's preference.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`border_width`**
    - The width of the border around each image in the grid. A width of 0 or less means no border is added.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`number_of_columns`**
    - Specifies the number of columns in the grid layout. This affects the overall arrangement and appearance of the grid image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_cell_size`**
    - The maximum size for each cell in the grid, controlling the dimensions of the images in the grid.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_red`**
    - The red component of the border color, allowing for customization of the border's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_green`**
    - The green component of the border color, contributing to the customization of the border's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_blue`**
    - The blue component of the border color, further allowing for customization of the border's appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The generated grid image as a tensor, suitable for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Grid_Image:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images_path": ("STRING", {"default":"./ComfyUI/input/", "multiline": False}),
                "pattern_glob": ("STRING", {"default":"*", "multiline": False}),
                "include_subfolders": (["false", "true"],),
                "border_width": ("INT", {"default":3, "min": 0, "max": 100, "step":1}),
                "number_of_columns": ("INT", {"default":6, "min": 1, "max": 24, "step":1}),
                "max_cell_size": ("INT", {"default":256, "min":32, "max":1280, "step":1}),
                "border_red": ("INT", {"default":0, "min": 0, "max": 255, "step":1}),
                "border_green": ("INT", {"default":0, "min": 0, "max": 255, "step":1}),
                "border_blue": ("INT", {"default":0, "min": 0, "max": 255, "step":1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "create_grid_image"

    CATEGORY = "WAS Suite/Image/Process"

    def create_grid_image(self, images_path, pattern_glob="*", include_subfolders="false", number_of_columns=6,
                            max_cell_size=256, border_width=3, border_red=0, border_green=0, border_blue=0):

        if not os.path.exists(images_path):
            cstr(f"The grid image path `{images_path}` does not exist!").error.print()
            return (pil2tensor(Image.new("RGB", (512,512), (0,0,0))),)

        paths = glob.glob(os.path.join(images_path, pattern_glob), recursive=(False if include_subfolders == "false" else True))
        image_paths = []
        for path in paths:
            if path.lower().endswith(ALLOWED_EXT) and os.path.exists(path):
                image_paths.append(path)

        grid_image = self.smart_grid_image(image_paths, int(number_of_columns), (int(max_cell_size), int(max_cell_size)),
                                                (False if border_width <= 0 else True), (int(border_red),
                                                int(border_green), int(border_blue)), int(border_width))

        return (pil2tensor(grid_image),)

    def smart_grid_image(self, images, cols=6, size=(256,256), add_border=False, border_color=(0,0,0), border_width=3):

        # calculate row height
        max_width, max_height = size
        row_height = 0
        images_resized = []
        for image in images:
            img = Image.open(image).convert('RGB')

            img_w, img_h = img.size
            aspect_ratio = img_w / img_h
            if aspect_ratio > 1: # landscape
                thumb_w = min(max_width, img_w-border_width)
                thumb_h = thumb_w / aspect_ratio
            else: # portrait
                thumb_h = min(max_height, img_h-border_width)
                thumb_w = thumb_h * aspect_ratio

            # pad the image to match the maximum size and center it within the cell
            pad_w = max_width - int(thumb_w)
            pad_h = max_height - int(thumb_h)
            left = pad_w // 2
            top = pad_h // 2
            right = pad_w - left
            bottom = pad_h - top
            padding = (left, top, right, bottom)  # left, top, right, bottom
            img_resized = ImageOps.expand(img.resize((int(thumb_w), int(thumb_h))), padding)

            if add_border:
                img_resized_bordered = ImageOps.expand(img_resized, border=border_width//2, fill=border_color)

            images_resized.append(img_resized)
            row_height = max(row_height, img_resized.size[1])
        row_height = int(row_height)

        # calculate the number of rows
        total_images = len(images_resized)
        rows = math.ceil(total_images / cols)

        # create empty image to put thumbnails
        new_image = Image.new('RGB', (cols*size[0]+(cols-1)*border_width, rows*row_height+(rows-1)*border_width), border_color)

        for i, img in enumerate(images_resized):
            if add_border:
                border_img = ImageOps.expand(img, border=border_width//2, fill=border_color)
                x = (i % cols) * (size[0]+border_width)
                y = (i // cols) * (row_height+border_width)
                if border_img.size == (size[0], size[1]):
                    new_image.paste(border_img, (x, y, x+size[0], y+size[1]))
                else:
                    # Resize image to match size parameter
                    border_img = border_img.resize((size[0], size[1]))
                    new_image.paste(border_img, (x, y, x+size[0], y+size[1]))
            else:
                x = (i % cols) * (size[0]+border_width)
                y = (i // cols) * (row_height+border_width)
                if img.size == (size[0], size[1]):
                    new_image.paste(img, (x, y, x+img.size[0], y+img.size[1]))
                else:
                    # Resize image to match size parameter
                    img = img.resize((size[0], size[1]))
                    new_image.paste(img, (x, y, x+size[0], y+size[1]))

        new_image = ImageOps.expand(new_image, border=border_width, fill=border_color)

        return new_image

```
