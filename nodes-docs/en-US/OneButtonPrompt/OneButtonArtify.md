---
tags:
- Prompt
---

# One Button Artify
## Documentation
- Class name: `OneButtonArtify`
- Category: `OneButtonPrompt`
- Output node: `False`

The OneButtonArtify node is designed to transform text prompts into art-inspired versions by incorporating artistic styles and elements. It allows users to specify an artist, the number of artists to influence the output, and the mode of artification, providing a creative and customizable approach to generating art-themed text prompts.
## Input types
### Required
- **`prompt`**
    - The main text input that will be transformed into an art-inspired version. It serves as the base content for artification.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`artist`**
    - Specifies the artist or artistic style to apply to the prompt, allowing for a wide range of artistic influences on the output.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`amount_of_artists`**
    - Determines how many artists' styles will influence the artified prompt, offering control over the diversity of artistic expression.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`artify_mode`**
    - Defines the mode of artification, such as standard or other specified modes, influencing how the artistic transformation is applied.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
### Optional
- **`seed`**
    - An optional parameter that sets the seed for random elements in the artification process, ensuring reproducibility of results.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`artified_prompt`**
    - Comfy dtype: `STRING`
    - The result of the artification process, a text prompt transformed by specified artistic styles and elements.
    - Python dtype: `str`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class OneButtonArtify:

    def __init__(self):
        pass
    
    @classmethod
    def INPUT_TYPES(s):
               
        return {
            "required": {
                "prompt": ("STRING", {"default": '', "multiline": True}),
                "artist": (artifyartists, {"default": "all"}),
                "amount_of_artists": (artifyamountofartistslist, {"default": "1"}),
                "artify_mode": (artifymodeslist, {"default": "standard"})
            },
            "optional": {                
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFFFFFFFFFF}),
            },
        }

    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("artified_prompt",)

    FUNCTION = "Comfy_OBP_Artify"

    #OUTPUT_NODE = False

    CATEGORY = "OneButtonPrompt"
    
    def Comfy_OBP_Artify(self, prompt, artist, amount_of_artists,artify_mode, seed):
        # artify here
        artified_prompt = artify_prompt(prompt=prompt, artists=artist, amountofartists=amount_of_artists, mode=artify_mode, seed=seed)
        
        print("Artified prompt: " + artified_prompt)
        
        return (artified_prompt,)

```
