---
tags:
- Mask
- MaskGeneration
---

# Create Shape Mask On Path
## Documentation
- Class name: `CreateShapeMaskOnPath`
- Category: `KJNodes/masking/generate`
- Output node: `False`

This node is designed to generate shape-based masks along a specified path, enabling the creation of dynamic and animated masking effects. It leverages shape parameters and path coordinates to craft masks that can evolve over time, providing a versatile tool for visual effects and image manipulation.
## Input types
### Required
- **`shape`**
    - Specifies the geometric shape of the mask to be created. This choice influences the mask's appearance and can be a circle, square, or triangle, offering a variety of visual styles for the mask.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`coordinates`**
    - Defines the center locations for the mask creation along a path. These coordinates dictate where the mask will be positioned, allowing for precise control over the mask's placement in the frame.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`grow`**
    - Determines the amount by which the shape grows on each frame, enabling the creation of animated masks that change size over time.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_width`**
    - Sets the width of the frame within which the mask is created, defining the spatial boundaries for mask generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`frame_height`**
    - Sets the height of the frame within which the mask is created, defining the spatial boundaries for mask generation.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shape_width`**
    - Specifies the initial width of the shape used to create the mask, affecting the mask's size and coverage area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`shape_height`**
    - Specifies the initial height of the shape used to create the mask, affecting the mask's size and coverage area.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`mask`**
    - Comfy dtype: `MASK`
    - The primary output mask created based on the specified shape and path coordinates.
    - Python dtype: `Tensor`
- **`mask_inverted`**
    - Comfy dtype: `MASK`
    - An inverted version of the primary mask, offering an alternative masking option where the shape's area is transparent and the surrounding area is opaque.
    - Python dtype: `Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class CreateShapeMaskOnPath:
    
    RETURN_TYPES = ("MASK", "MASK",)
    RETURN_NAMES = ("mask", "mask_inverted",)
    FUNCTION = "createshapemask"
    CATEGORY = "KJNodes/masking/generate"
    DESCRIPTION = """
Creates a mask or batch of masks with the specified shape.  
Locations are center locations.  
Grow value is the amount to grow the shape on each frame, creating animated masks.
"""

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "shape": (
            [   'circle',
                'square',
                'triangle',
            ],
            {
            "default": 'circle'
             }),
                "coordinates": ("STRING", {"forceInput": True}),
                "grow": ("INT", {"default": 0, "min": -512, "max": 512, "step": 1}),
                "frame_width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                "frame_height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
                "shape_width": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
                "shape_height": ("INT", {"default": 128,"min": 8, "max": 4096, "step": 1}),
        },
    } 

    def createshapemask(self, coordinates, frame_width, frame_height, shape_width, shape_height, grow, shape):
        # Define the number of images in the batch
        coordinates = coordinates.replace("'", '"')
        coordinates = json.loads(coordinates)

        batch_size = len(coordinates)
        out = []
        color = "white"
        
        for i, coord in enumerate(coordinates):
            image = Image.new("RGB", (frame_width, frame_height), "black")
            draw = ImageDraw.Draw(image)

            # Calculate the size for this frame and ensure it's not less than 0
            current_width = max(0, shape_width + i*grow)
            current_height = max(0, shape_height + i*grow)

            location_x = coord['x']
            location_y = coord['y']

            if shape == 'circle' or shape == 'square':
                # Define the bounding box for the shape
                left_up_point = (location_x - current_width // 2, location_y - current_height // 2)
                right_down_point = (location_x + current_width // 2, location_y + current_height // 2)
                two_points = [left_up_point, right_down_point]

                if shape == 'circle':
                    draw.ellipse(two_points, fill=color)
                elif shape == 'square':
                    draw.rectangle(two_points, fill=color)
                    
            elif shape == 'triangle':
                # Define the points for the triangle
                left_up_point = (location_x - current_width // 2, location_y + current_height // 2) # bottom left
                right_down_point = (location_x + current_width // 2, location_y + current_height // 2) # bottom right
                top_point = (location_x, location_y - current_height // 2) # top point
                draw.polygon([top_point, left_up_point, right_down_point], fill=color)

            image = pil2tensor(image)
            mask = image[:, :, :, 0]
            out.append(mask)
        outstack = torch.cat(out, dim=0)
        return (outstack, 1.0 - outstack,)

```
