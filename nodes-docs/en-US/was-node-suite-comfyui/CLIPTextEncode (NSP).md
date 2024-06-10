---
tags:
- CLIP
- CLIPConditioning
- Conditioning
---

# CLIPTextEncode (NSP)
## Documentation
- Class name: `CLIPTextEncode (NSP)`
- Category: `WAS Suite/Conditioning`
- Output node: `True`

This node specializes in encoding text inputs using CLIP models, enhanced with Noodle Soup Prompts (NSP) or wildcard text transformations. It aims to provide a versatile text encoding capability that can adapt to different prompt styles and requirements, making it suitable for a wide range of text-to-image or text-based conditioning applications.
## Input types
### Required
- **`mode`**
    - Determines whether Noodle Soup Prompts or wildcards are used for text transformation. This choice affects how the text is parsed and encoded.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`noodle_key`**
    - A key used in Noodle Soup Prompts for dynamic text replacement. It's essential for customizing the prompt transformation process.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - A seed for random number generation, used in text transformation to ensure reproducibility or variability.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`text`**
    - The text input to be encoded. This can include Noodle Soup Prompts or wildcards, which are then transformed based on the mode selected.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`clip`**
    - The CLIP model to be used for encoding the text. It plays a crucial role in determining the quality and relevance of the encoded output.
    - Comfy dtype: `CLIP`
    - Python dtype: `torch.nn.Module`
## Output types
- **`conditioning`**
    - Comfy dtype: `CONDITIONING`
    - The encoded text output, suitable for use in text-to-image generation or other conditioning contexts.
    - Python dtype: `torch.Tensor`
- **`parsed_text`**
    - Comfy dtype: `STRING`
    - The text after being processed by NSP or wildcard transformation, providing insight into how the input text was interpreted.
    - Python dtype: `str`
- **`raw_text`**
    - Comfy dtype: `STRING`
    - The original text input before any NSP or wildcard transformation, allowing for comparison with the parsed text.
    - Python dtype: `str`
- **`ui`**
    - A user interface element that displays the parsed text, enhancing user interaction by showing how the input text was transformed.
## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class WAS_NSP_CLIPTextEncoder:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "mode": (["Noodle Soup Prompts", "Wildcards"],),
                "noodle_key": ("STRING", {"default": '__', "multiline": False}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "text": ("STRING", {"multiline": True}),
                "clip": ("CLIP",),
            }
        }

    OUTPUT_NODE = True
    RETURN_TYPES = ("CONDITIONING", TEXT_TYPE, TEXT_TYPE)
    RETURN_NAMES = ("conditioning", "parsed_text", "raw_text")
    FUNCTION = "nsp_encode"

    CATEGORY = "WAS Suite/Conditioning"

    def nsp_encode(self, clip, text, mode="Noodle Soup Prompts", noodle_key='__', seed=0):

        if mode == "Noodle Soup Prompts":
            new_text = nsp_parse(text, seed, noodle_key)
        else:
            new_text = replace_wildcards(text, (None if seed == 0 else seed), noodle_key)

        new_text = parse_dynamic_prompt(new_text, seed)
        new_text, text_vars = parse_prompt_vars(new_text)
        cstr(f"CLIPTextEncode Prased Prompt:\n {new_text}").msg.print()
        CLIPTextEncode = nodes.CLIPTextEncode()
        encoded = CLIPTextEncode.encode(clip=clip, text=new_text)

        return (encoded[0], new_text, text, { "ui": { "string": new_text } })

```
