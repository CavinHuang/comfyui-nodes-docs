
# Documentation
- Class name: CLIPTextEncode (BlenderNeko Advanced + NSP)
- Category: WAS Suite/Conditioning
- Output node: True
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

CLIPTextEncode (BlenderNeko Advanced + NSP) 节点专门用于使用高级CLIP模型对文本输入进行编码，该模型经过BlenderNeko的改进，并可选择性地结合Noodle Soup Prompts (NSP)进行动态文本操作。它旨在为下游任务（如图像生成或基于文本的条件控制）提供更加细致和上下文感知的文本表示。

# Input types
## Required
- mode
    - 确定文本操作的模式，例如使用Noodle Soup Prompts进行动态文本更改。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- noodle_key
    - 在Noodle Soup Prompts中使用的关键字，用于识别文本中需要动态替换的占位符。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 用于文本操作中随机元素的种子，确保文本编码的可重现性。
    - Comfy dtype: INT
    - Python dtype: int
- clip
    - 用于编码文本的CLIP模型。它对理解输入文本的上下文和语义至关重要。
    - Comfy dtype: CLIP
    - Python dtype: torch.nn.Module
- token_normalization
    - 决定在编码过程中如何对标记进行归一化，影响表示对标记频率的敏感度。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- weight_interpretation
    - 控制在编码过程中如何解释权重，影响对文本某些方面的强调。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 要编码的输入文本。这个文本可以根据所选模式动态修改，允许创造性和上下文敏感的文本表示。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- conditioning
    - 编码后的文本表示，适用于下游任务如图像生成。
    - Comfy dtype: CONDITIONING
    - Python dtype: List[List[float]]
- parsed_text
    - 经过节点处理和可能修改后的文本，反映了动态更改或操作。
    - Comfy dtype: STRING
    - Python dtype: str
- raw_text
    - 在任何处理或操作之前的原始输入文本。
    - Comfy dtype: STRING
    - Python dtype: str
- ui
    - 显示处理后文本的用户界面元素，提供对文本如何被解释和操作的洞察。


## Usage tips
- Infra type: `GPU`
- Common nodes:
    - [KSamplerAdvanced](../../Comfy/Nodes/KSamplerAdvanced.md)
    - KRestartSamplerAdv



## Source code
```python
    class WAS_AdvancedCLIPTextEncode:
        @classmethod
        def INPUT_TYPES(s):
            return {
                "required": {
                    "mode": (["Noodle Soup Prompts", "Wildcards"],),
                    "noodle_key": ("STRING", {"default": '__', "multiline": False}),
                    "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                    "clip": ("CLIP", ),
                    "token_normalization": (["none", "mean", "length", "length+mean"],),
                    "weight_interpretation": (["comfy", "A1111", "compel", "comfy++"],),
                    "text": ("STRING", {"multiline": True}),
                    }
                }

        RETURN_TYPES = ("CONDITIONING", TEXT_TYPE, TEXT_TYPE)
        RETURN_NAMES = ("conditioning", "parsed_text", "raw_text")
        OUTPUT_NODE = True
        FUNCTION = "encode"
        CATEGORY = "WAS Suite/Conditioning"

        DESCRIPTION = "A node based on Blenderneko's <a href='https://github.com/BlenderNeko/ComfyUI_ADV_CLIP_embw' target='_blank'>Advanced CLIP Text Encode</a>. This version adds the ability to use Noodle Soup Prompts and Wildcards. Wildcards are stored in WAS Node Suite root under the folder 'wildcards'. You can create the folder if it doesn't exist and move your wildcards into it."
        URL = {
            "Example Workflow": "https://github.com/WASasquatch/was-node-suite-comfyui",
        }
        IMAGES = [
            "https://i.postimg.cc/Jh4N2h5r/CLIPText-Encode-BLK-plus-NSP.png",
        ]

        def encode(self, clip, text, token_normalization, weight_interpretation, seed=0, mode="Noodle Soup Prompts", noodle_key="__"):

            BKAdvCLIP_dir = os.path.join(CUSTOM_NODES_DIR, "ComfyUI_ADV_CLIP_emb")
            sys.path.append(BKAdvCLIP_dir)

            from ComfyUI_ADV_CLIP_emb.nodes import AdvancedCLIPTextEncode

            if mode == "Noodle Soup Prompts":
                new_text = nsp_parse(text, int(seed), noodle_key)
            else:
                new_text = replace_wildcards(text, (None if seed == 0 else seed), noodle_key)

            new_text = parse_dynamic_prompt(new_text, seed)
            new_text, text_vars = parse_prompt_vars(new_text)
            cstr(f"CLIPTextEncode Prased Prompt:\n {new_text}").msg.print()

            encode = AdvancedCLIPTextEncode().encode(clip, new_text, token_normalization, weight_interpretation)

            sys.path.remove(BKAdvCLIP_dir)

            return ([[encode[0][0][0], encode[0][0][1]]], new_text, text, { "ui": { "string": new_text } } )

```
