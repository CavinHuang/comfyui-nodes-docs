---
tags:
- GridLayout
- Image
- Tiled
---

# Create Grid Image from Batch
## Documentation
- Class name: `Create Grid Image from Batch`
- Category: `WAS Suite/Image/Process`
- Output node: `False`

This node is designed to generate a grid image from a batch of images. It organizes multiple images into a grid layout based on specified parameters such as the number of columns, maximum cell size, and border properties. The node aims to facilitate the visualization of collections of images in a structured and aesthetically pleasing manner.
## Input types
### Required
- **`images`**
    - Specifies the directory path where the images are located. This path is essential for the node to locate and process the images for grid generation.
    - Comfy dtype: `IMAGE`
    - Python dtype: `str`
- **`border_width`**
    - Specifies the width of the border around each image in the grid. This parameter adds a visual separation between images, enhancing the grid's clarity and aesthetics.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`number_of_columns`**
    - Indicates the number of columns in the grid. This parameter directly influences the layout of the grid image by specifying how many images are placed in each row.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`max_cell_size`**
    - Sets the maximum size for each cell in the grid. This parameter controls the scaling of images to fit within the specified cell dimensions, ensuring a uniform appearance.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_red`**
    - Determines the red component of the border color. This parameter, along with the green and blue components, allows for customization of the border color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_green`**
    - Determines the green component of the border color. This parameter, along with the red and blue components, allows for customization of the border color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`border_blue`**
    - Determines the blue component of the border color. This parameter, along with the red and green components, allows for customization of the border color.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - Produces a tensor representation of the generated grid image. This output facilitates further processing or visualization within the pipeline.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_Image_Grid_Image_Batch:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "images": ("IMAGE",),
                "border_width": ("INT", {"default":3, "min": 0, "max": 100, "step":1}),
                "number_of_columns": ("INT", {"default":6, "min": 1, "max": 24, "step":1}),
                "max_cell_size": ("INT", {"default":256, "min":32, "max":2048, "step":1}),
                "border_red": ("INT", {"default":0, "min": 0, "max": 255, "step":1}),
                "border_green": ("INT", {"default":0, "min": 0, "max": 255, "step":1}),
                "border_blue": ("INT", {"default":0, "min": 0, "max": 255, "step":1}),
            }
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "smart_grid_image"

    CATEGORY = "WAS Suite/Image/Process"

    def smart_grid_image(self, images, number_of_columns=6, max_cell_size=256, add_border=False, border_red=255, border_green=255, border_blue=255, border_width=3):

        cols = number_of_columns
        border_color = (border_red, border_green, border_blue)

        images_resized = []
        max_row_height = 0

        for tensor_img in images:
            img = tensor2pil(tensor_img)
            img_w, img_h = img.size
            aspect_ratio = img_w / img_h

            if img_w > img_h:
                cell_w = min(img_w, max_cell_size)
                cell_h = int(cell_w / aspect_ratio)
            else:
                cell_h = min(img_h, max_cell_size)
                cell_w = int(cell_h * aspect_ratio)

            img_resized = img.resize((cell_w, cell_h))

            if add_border:
                img_resized = ImageOps.expand(img_resized, border=border_width // 2, fill=border_color)

            images_resized.append(img_resized)
            max_row_height = max(max_row_height, cell_h)

        max_row_height = int(max_row_height)
        total_images = len(images_resized)
        rows = math.ceil(total_images / cols)

        grid_width = cols * max_cell_size + (cols - 1) * border_width
        grid_height = rows * max_row_height + (rows - 1) * border_width

        new_image = Image.new('RGB', (grid_width, grid_height), border_color)

        for i, img in enumerate(images_resized):
            x = (i % cols) * (max_cell_size + border_width)
            y = (i // cols) * (max_row_height + border_width)

            img_w, img_h = img.size
            paste_x = x + (max_cell_size - img_w) // 2
            paste_y = y + (max_row_height - img_h) // 2

            new_image.paste(img, (paste_x, paste_y, paste_x + img_w, paste_y + img_h))

        if add_border:
            new_image = ImageOps.expand(new_image, border=border_width, fill=border_color)

        return (pil2tensor(new_image), )

```
