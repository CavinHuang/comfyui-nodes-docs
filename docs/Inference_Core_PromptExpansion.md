
# Documentation
- Class name: Inference_Core_PromptExpansion
- Category: utils
- Output node: False
- Repo Ref: https://github.com/comfyanonymous/ComfyUI

Inference_Core_PromptExpansion节点旨在使用预训练语言模型来增强和扩展输入提示。它根据给定的种子自动调整输入提示，通过添加额外的上下文或变体来丰富提示内容，并输出扩展后的版本。这个过程的目的是提高提示的质量和相关性，以便用于后续的处理或生成任务。

# Input types
## Required
- model_name
    - 指定用于提示扩展的模型。它决定了扩展的语言风格和能力。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- text
    - 需要扩展的初始文本提示。它作为基础内容，将被丰富和扩展以生成更详细或多样化的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 一个整数种子，用于影响扩展提示的变化。它确保了扩展过程的可重复性，允许在不同运行中获得一致的结果。
    - Comfy dtype: INT
    - Python dtype: int
- log_prompt
    - 一个布尔标志，用于控制是否记录原始和扩展后的提示，以便进行调试或分析。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool

# Output types
- expanded_prompt
    - 原始提示的丰富和扩展版本，通过基于种子整合额外的上下文或变体而产生。
    - Comfy dtype: STRING
    - Python dtype: str
- seed
    - 用于扩展过程的种子值，返回以供参考或进一步使用。
    - Comfy dtype: INT
    - Python dtype: int


## Usage tips
- Infra type: `GPU`
- Common nodes: unknown


## Source code
```python
class PromptExpansion:
    # noinspection PyPep8Naming,PyMethodParameters
    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
                "model_name": (folder_paths.get_filename_list("prompt_expansion"),),
                "text": ("STRING", {"multiline": True}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xFFFFFFFF}),
                "log_prompt": ("BOOLEAN", {"default": False})
            },
        }

    RETURN_TYPES = (
        "STRING",
        "INT",
    )
    RETURN_NAMES = (
        "expanded_prompt",
        "seed",
    )
    FUNCTION = "expand_prompt"  # Function name

    CATEGORY = "utils"  # Category for organization

    @staticmethod
    @torch.no_grad()
    def expand_prompt(model_name: str, text: str, seed: int, log_prompt: bool):
        expansion = load_expansion_runner(model_name)

        prompt = remove_empty_str([safe_str(text)], default="")[0]

        max_seed = 1024 * 1024 * 1024
        if not isinstance(seed, int):
            seed = random.randint(1, max_seed)
        elif seed < 0:
            seed = abs(seed)
        elif seed > max_seed:
            seed = seed % max_seed
            
        prompt_parts = []
        expanded_parts = []
            
        # Split prompt if longer than 256
        if len(prompt) > 256:
            prompt_lines = prompt.splitlines()
            # Fill part until 256
            prompt_parts = [""]
            filled_chars = 0
            for line in prompt_lines:
                # When adding the line would exceed 256, start a new part
                if filled_chars + len(line) > 256:
                    prompt_parts.append(line)
                    filled_chars = len(line)
                else:
                    prompt_parts[-1] += line
                    filled_chars += len(line)
        else:
            prompt_parts = [prompt]
        
        for i, part in enumerate(prompt_parts):
            expansion_part = expansion(part, seed)
            full_part = join_prompts(part, expansion_part)
            expanded_parts.append(full_part)
            
        expanded_prompt = "\n".join(expanded_parts)
            
        if log_prompt:
            if logger.isEnabledFor(logging.INFO):
                logger.info(f"Prompt: {prompt!r}")
                logger.info(f"Expanded Prompt: {expanded_prompt!r}")
            else:
                print(f"Prompt: {prompt!r}")
                print(f"Expanded Prompt: {expanded_prompt!r}")

        return expanded_prompt, seed

```
