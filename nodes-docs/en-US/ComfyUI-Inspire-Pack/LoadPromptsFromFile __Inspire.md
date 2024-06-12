---
tags:
- Prompt
---

# Load Prompts From File (Inspire)
## Documentation
- Class name: `LoadPromptsFromFile __Inspire`
- Category: `InspirePack/Prompt`
- Output node: `False`

The LoadPromptsFromFile node is designed to read and parse prompt data from a specified file, extracting structured information based on predefined patterns. It aims to facilitate the generation or manipulation of text prompts by providing a structured format for positive and negative prompt components.
## Input types
### Required
- **`prompt_file`**
    - Specifies the file from which to load prompts, serving as a key input to determine the source of prompt data for processing.
    - Comfy dtype: `COMBO[STRING]`
    - Python dtype: `str`
## Output types
- **`zipped_prompt`**
    - Comfy dtype: `ZIPPED_PROMPT`
    - Returns a list of tuples, each containing the positive text, negative text, and the file name from which the prompt was loaded, representing the structured prompt data extracted from the file.
    - Python dtype: `List[Tuple[str, str, str]]`
## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LoadPromptsFromFile:
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

        return {"required": {"prompt_file": (prompt_files,)}}

    RETURN_TYPES = ("ZIPPED_PROMPT",)
    OUTPUT_IS_LIST = (True,)

    FUNCTION = "doit"

    CATEGORY = "InspirePack/Prompt"

    def doit(self, prompt_file):
        prompt_path = os.path.join(prompts_path, prompt_file)

        prompts = []
        try:
            with open(prompt_path, "r", encoding="utf-8") as file:
                prompt_data = file.read()
                prompt_list = re.split(r'\n\s*-+\s*\n', prompt_data)

                pattern = r"positive:(.*?)(?:\n*|$)negative:(.*)"

                for prompt in prompt_list:
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
