---
tags:
- Batch
- Image
- ImageBatch
---

# ImageBatchTestPattern
## Documentation
- Class name: `ImageBatchTestPattern`
- Category: `KJNodes/text`
- Output node: `False`

Generates a batch of images with sequential numbers displayed in a random color on a black background. This node is useful for testing and visualizing batch processing capabilities by creating easily distinguishable images.
## Input types
### Required
- **`batch_size`**
    - Specifies the number of images to generate in the batch, allowing for dynamic batch size customization.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`start_from`**
    - Defines the starting number for the sequence, allowing for flexible numbering schemes.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_x`**
    - Determines the horizontal position of the text within the image, enabling precise placement of the numbers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_y`**
    - Determines the vertical position of the text within the image, enabling precise placement of the numbers.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`width`**
    - Specifies the width of the generated images, dictating the horizontal dimension of the batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - Specifies the height of the generated images, dictating the vertical dimension of the batch.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font`**
    - Determines the font used for numbering the images, enabling font style customization for the generated text.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`font_size`**
    - Sets the size of the font used for the text, affecting the visibility and aesthetics of the numbers on the images.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The tensor representation of the generated image batch, ready for further processing or visualization.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class ImageBatchTestPattern:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "batch_size": ("INT", {"default": 1,"min": 1, "max": 255, "step": 1}),
            "start_from": ("INT", {"default": 0,"min": 0, "max": 255, "step": 1}),
            "text_x": ("INT", {"default": 256,"min": 0, "max": 4096, "step": 1}),
            "text_y": ("INT", {"default": 256,"min": 0, "max": 4096, "step": 1}),
            "width": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
            "height": ("INT", {"default": 512,"min": 16, "max": 4096, "step": 1}),
            "font": (folder_paths.get_filename_list("kjnodes_fonts"), ),
            "font_size": ("INT", {"default": 255,"min": 8, "max": 4096, "step": 1}),
        }}

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "generatetestpattern"
    CATEGORY = "KJNodes/text"

    def generatetestpattern(self, batch_size, font, font_size, start_from, width, height, text_x, text_y):
        out = []
        # Generate the sequential numbers for each image
        numbers = np.arange(start_from, start_from + batch_size)
        font_path = folder_paths.get_full_path("kjnodes_fonts", font)

        for number in numbers:
            # Create a black image with the number as a random color text
            image = Image.new("RGB", (width, height), color='black')
            draw = ImageDraw.Draw(image)
            
            # Generate a random color for the text
            font_color = (random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))
            
            font = ImageFont.truetype(font_path, font_size)
            
            # Get the size of the text and position it in the center
            text = str(number)
           
            try:
                draw.text((text_x, text_y), text, font=font, fill=font_color, features=['-liga'])
            except:
                draw.text((text_x, text_y), text, font=font, fill=font_color,)
            
            # Convert the image to a numpy array and normalize the pixel values
            image_np = np.array(image).astype(np.float32) / 255.0
            image_tensor = torch.from_numpy(image_np).unsqueeze(0)
            out.append(image_tensor)
        out_tensor = torch.cat(out, dim=0)
  
        return (out_tensor,)

```
