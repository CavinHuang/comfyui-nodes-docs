---
tags:
- AnimationScheduling
- VisualEffects
---

# FL Ascii
## Documentation
- Class name: `FL_Ascii`
- Category: `🏵️Fill Nodes`
- Output node: `False`

The FL_Ascii node transforms images into ASCII art by resizing the input image based on specified spacing and then mapping pixel brightness values to characters. This artistic effect leverages a chosen font and character set to recreate the original image with a unique, text-based aesthetic.
## Input types
### Required
- **`image`**
    - The input image to be transformed into ASCII art. It serves as the canvas for the ASCII conversion process.
    - Comfy dtype: `IMAGE`
    - Python dtype: `torch.Tensor`
- **`spacing`**
    - Determines the spacing between characters in the ASCII art, affecting the resolution and detail of the output.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_size`**
    - Specifies the size of the font used in generating ASCII art, influencing the clarity and readability of the text.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`font_name`**
    - The name of the font used to render characters in the ASCII art, impacting the style and appearance of the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`characters`**
    - A string of characters used as the palette for creating the ASCII art, where each character's placement is based on pixel brightness.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`image`**
    - Comfy dtype: `IMAGE`
    - The resulting ASCII art as an image, showcasing the original image reinterpreted with characters.
    - Python dtype: `torch.Tensor`
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class FL_Ascii:
    def __init__(self):
        pass


    @classmethod
    def INPUT_TYPES(s):
        font_list = [x.split('/')[-1] for x in matplotlib.font_manager.findSystemFonts(fontpaths=None, fontext="ttf" )]
        return {
            "required": {
                "image": ("IMAGE",),
                "spacing": (
                    "INT",
                    {
                        "default": 20,
                        "min": 4,
                        "max": 100,
                        "step": 2,
                    },
                ),
                "font_size": (
                    "INT",
                    {
                        "default": 20,
                        "min": 4,
                        "max": 100,
                        "step": 2,
                    },
                ),
                "font_name": (font_list,),
                "characters": (
                    "STRING",
                    {
                        "default": "",
                        "description": "characters to use",
                    },
                ),
            },
        }

    RETURN_TYPES = ("IMAGE",)
    FUNCTION = "apply_ascii_art_effect"
    CATEGORY = "🏵️Fill Nodes"

    def apply_ascii_art_effect(
        self,
        image: torch.Tensor,
        spacing: int,
        font_size: int,
        font_name: str,
        characters,
    ):
        batch_size, height, width, channels = image.shape
        result = torch.zeros_like(image)

        for b in range(batch_size):
            img_b = image[b] * 255.0
            img_b = Image.fromarray(img_b.numpy().astype("uint8"), "RGB")
            result_b = ascii_art_effect(
                img_b, spacing, font_size, font_name, characters
            )
            result_b = torch.tensor(np.array(result_b)) / 255.0
            result[b] = result_b

            # Update the print log
            progress = (b + 1) / batch_size * 100
            sys.stdout.write(f"\rProcessing images: {progress:.2f}%")
            sys.stdout.flush()

        # Print a new line after the progress log
        print()

        return (result,)

```
