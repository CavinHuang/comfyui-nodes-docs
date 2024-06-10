---
tags:
- Prompt
---

# [Inference.Core] [Inference.Core] Prompt Expansion
## Documentation
- Class name: `Inference_Core_PromptExpansion`
- Category: `utils`
- Output node: `False`

The Inference_Core_PromptExpansion node is designed to enhance and expand input prompts using a pre-trained language model. It automatically adjusts the input prompt based on a given seed, enriches it with additional context or variations, and outputs the expanded version. This process is aimed at improving the quality and relevance of the prompt for subsequent processing or generation tasks.
## Input types
### Required
- **`model_name`**
    - Specifies the model used for prompt expansion. It determines the linguistic style and capabilities of the expansion.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`text`**
    - The initial text prompt to be expanded. It serves as the base content that will be enriched and extended to generate a more detailed or varied output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`seed`**
    - An integer seed that influences the variation in the expanded prompt. It ensures reproducibility of the expansion process, allowing for consistent results across different runs.
    - Comfy dtype: `INT`
    - Python dtype: `int`
- **`log_prompt`**
    - A boolean flag that controls the logging of the original and expanded prompts for debugging or analysis purposes.
    - Comfy dtype: `BOOLEAN`
    - Python dtype: `bool`
## Output types
- **`expanded_prompt`**
    - Comfy dtype: `STRING`
    - The enriched and extended version of the original prompt, produced by incorporating additional context or variations based on the seed.
    - Python dtype: `str`
- **`seed`**
    - Comfy dtype: `INT`
    - The seed value used for the expansion process, returned for reference or further use.
    - Python dtype: `int`
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
