# AddLabel
## Documentation
- Class name: `AddLabel`
- Category: `KJNodes/text`
- Output node: `False`

The `AddLabel` node is designed to add textual labels to images, allowing for customization of text position, size, color, and the label's background color. It supports both single and batch processing, with the ability to handle multiple captions for batch images.
## Input types
### Required
- **`image`**
    - The input image to which the label will be added. This is the primary canvas for label addition.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`text_x`**
    - The x-coordinate for the starting point of the text on the image. It determines where horizontally the text will begin.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text_y`**
    - The y-coordinate for the starting point of the text on the image. It determines where vertically the text will begin.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`height`**
    - The height of the label area to be added to the image. It affects the overall height of the resulting image.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_size`**
    - The size of the font used for the label text. This determines how large the text appears on the label.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_color`**
    - The color of the font used for the label text. It defines the visual appearance of the text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`label_color`**
    - The background color of the label area. This color will fill the background of the text label.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`font`**
    - The font used for the label text. This parameter allows for the selection of different font styles.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The text content to be added as a label on the image. This is the actual label text.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`direction`**
    - The direction in which the label will be added to the image, either above (up) or below (down).
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`caption`**
    - Optional captions for batch processing. When provided, each image in the batch will have its corresponding caption as a label.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The output image with the added label. This image includes the original content plus the newly added label area.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class AddLabel:
    @classmethod
    def INPUT_TYPES(s):
        return {"required": {
            "image":("IMAGE",),  
            "text_x": ("INT", {"default": 10, "min": 0, "max": 4096, "step": 1}),
            "text_y": ("INT", {"default": 2, "min": 0, "max": 4096, "step": 1}),
            "height": ("INT", {"default": 48, "min": 0, "max": 4096, "step": 1}),
            "font_size": ("INT", {"default": 32, "min": 0, "max": 4096, "step": 1}),
            "font_color": ("STRING", {"default": "white"}),
            "label_color": ("STRING", {"default": "black"}),
            "font": (folder_paths.get_filename_list("kjnodes_fonts"), ),
            "text": ("STRING", {"default": "Text"}),
            "direction": (
            [   'up',
                'down',
            ],
            {
            "default": 'up'
             }),
            },
            "optional":{
                "caption": ("STRING", {"default": "", "forceInput": True}),
            }
            }
    
    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "addlabel"
    CATEGORY = "KJNodes/text"
    DESCRIPTION = """
Creates a new with the given text, and concatenates it to  
either above or below the input image.  
Note that this changes the input image's height!  
Fonts are loaded from this folder:  
ComfyUI/custom_nodes/ComfyUI-KJNodes/fonts
"""
        
    def addlabel(self, image, text_x, text_y, text, height, font_size, font_color, label_color, font, direction, caption=""):
        batch_size = image.shape[0]
        width = image.shape[2]
        
        if font == "TTNorms-Black.otf":
            font_path = os.path.join(script_directory, "fonts", "TTNorms-Black.otf")
        else:
            font_path = folder_paths.get_full_path("kjnodes_fonts", font)
        
        if caption == "":
            label_image = Image.new("RGB", (width, height), label_color)
            draw = ImageDraw.Draw(label_image)
            font = ImageFont.truetype(font_path, font_size)
            try:
                draw.text((text_x, text_y), text, font=font, fill=font_color, features=['-liga'])
            except:
                draw.text((text_x, text_y), text, font=font, fill=font_color)

            label_image = np.array(label_image).astype(np.float32) / 255.0
            label_image = torch.from_numpy(label_image)[None, :, :, :]
            # Duplicate the label image for the entire batch
            label_batch = label_image.repeat(batch_size, 1, 1, 1)
        else:
            label_list = []
            assert len(caption) == batch_size, "Number of captions does not match number of images"
            for cap in caption:
                label_image = Image.new("RGB", (width, height), label_color)
                draw = ImageDraw.Draw(label_image)
                font = ImageFont.truetype(font_path, font_size)
                try:
                    draw.text((text_x, text_y), cap, font=font, fill=font_color, features=['-liga'])
                except:
                    draw.text((text_x, text_y), cap, font=font, fill=font_color)

                label_image = np.array(label_image).astype(np.float32) / 255.0
                label_image = torch.from_numpy(label_image)
                label_list.append(label_image)
            label_batch = torch.stack(label_list)
            print(label_batch.shape)

        if direction == 'down':
            combined_images = torch.cat((image, label_batch), dim=1)
        elif direction == 'up':
            combined_images = torch.cat((label_batch, image), dim=1)
        
        return (combined_images,)

```
