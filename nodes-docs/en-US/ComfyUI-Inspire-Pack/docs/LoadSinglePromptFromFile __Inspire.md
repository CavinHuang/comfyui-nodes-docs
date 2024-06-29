---
tags:
- Prompt
---

# Load Single Prompt From File (Inspire)
## Documentation
- Class name: `LoadSinglePromptFromFile __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

This node is designed to load a specific prompt from a file, allowing for targeted retrieval of text prompts based on an index. It facilitates the extraction of creative or instructional content from structured text files, enhancing the flexibility and specificity of content generation workflows.
## Input types
### Required
- **`prompt_file`**
    - Specifies the file path from which to load the prompt, acting as a direct reference to the desired content source.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
- **`index`**
    - Determines the specific prompt to be loaded from the file, enabling selective retrieval of content.
    - Comfy dtype: `INT`
    - Python dtype: `int`
## Output types
- **`zipped_prompt`**
    - Comfy dtype: `ZIPPED_PROMPT`
    - Returns a list of tuples, each containing the positive and negative text extracted from the specified prompt, along with the file name. This structured output, referred to as 'zipped_prompt', is ready for further processing.
    - Python dtype: `List[Tuple[str, str, str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadSinglePromptFromFile:
    @classmethod
    def INPUT_TYPES(cls):
        global prompts_path
        try:
            prompt_files = []
            for root, dirs, files in os.walk(prompts_path):
                for file in files:
                    if file.endswith(".txt"):
                        file_path = os.path.join(root, file)
                        rel_path = os.path.relpath(file_path, prompts_path)
                        prompt_files.append(rel_path)
        except Exception:
            prompt_files = []

        return {"required": {
            "prompt_file": (prompt_files,),
            "index": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
            }
        }

    RETURN_TYPES = ("ZIPPED_PROMPT",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, prompt_file, index):
        prompt_path = os.path.join(prompts_path, prompt_file)

        prompts = []
        try:
            with open(prompt_path, "r", encoding="utf-8") as file:
                prompt_data = file.read()
                prompt_list = re.split(r'\n\s*-+\s*\n', prompt_data)
                try:
                    prompt = prompt_list[index]
                except Exception:
                    prompt = prompt_list[-1]

                pattern = r"positive:(.*?)(?:\n*|$)negative:(.*)"
                matches = re.search(pattern, prompt, re.DOTALL)

                if matches:
                    positive_text = matches.group(1).strip()
                    negative_text = matches.group(2).strip()
                    result_tuple = (positive_text, negative_text, prompt_file)
                    prompts.append(result_tuple)
                else:
                    print(f"[WARN] LoadPromptsFromFile: invalid prompt format in '{prompt_file}'")
        except Exception as e:
            print(f"[ERROR] LoadPromptsFromFile: an error occurred while processing '{prompt_file}': {str(e)}")

        return (prompts, )

```
