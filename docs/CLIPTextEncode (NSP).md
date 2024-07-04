
# Documentation
- Class name: CLIPTextEncode (NSP)
- Category: WAS Suite/Conditioning
- Output node: True
- Repo Ref: https://github.com/WASasquatch/was-node-suite-comfyui

CLIPTextEncode (NSP) 节点专门使用 CLIP 模型对文本输入进行编码，并通过 Noodle Soup Prompts (NSP) 或通配符文本转换进行增强。它旨在提供一种灵活的文本编码能力，可以适应不同的提示风格和需求，使其适用于广泛的文本到图像或基于文本的条件应用。

# Input types
## Required
- mode
    - 决定是否使用 Noodle Soup Prompts 或通配符进行文本转换。这个选择影响了文本的解析和编码方式。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- noodle_key
    - 在 Noodle Soup Prompts 中用于动态文本替换的关键字。它对自定义提示转换过程至关重要。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 用于随机数生成的种子，在文本转换中使用，以确保可重现性或可变性。
    - Comfy dtype: INT
    - Python dtype: int
- text
    - 要编码的文本输入。这可以包括 Noodle Soup Prompts 或通配符，然后根据选择的模式进行转换。
    - Comfy dtype: STRING
    - Python dtype: str
- clip
    - 用于编码文本的 CLIP 模型。它在决定编码输出的质量和相关性方面起着至关重要的作用。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module

# Output types
- conditioning
    - 编码后的文本输出，适用于文本到图像生成或其他条件上下文。
    - Comfy dtype: CONDITIONING
    - Python dtype: torch.Tensor
- parsed_text
    - 经过 NSP 或通配符转换处理后的文本，提供了输入文本如何被解释的洞察。
    - Comfy dtype: STRING
    - Python dtype: str
- raw_text
    - 在任何 NSP 或通配符转换之前的原始文本输入，允许与解析后的文本进行比较。
    - Comfy dtype: STRING
    - Python dtype: str
- ui
    - 显示解析后文本的用户界面元素，通过显示输入文本如何被转换来增强用户交互。


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
