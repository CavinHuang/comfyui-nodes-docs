
# Documentation
- Class name: LoadSinglePromptFromFile __Inspire
- Category: InspirePack/Prompt
- Output node: False

该节点旨在从文件中加载特定的提示文本，允许根据索引有针对性地检索文本提示。它有助于从结构化文本文件中提取创意或指导性内容，增强了内容生成工作流程的灵活性和特异性。

# Input types
## Required
- prompt_file
    - 指定从中加载提示文本的文件路径，作为所需内容源的直接引用。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str
- index
    - 确定要从文件中加载的特定提示，实现内容的选择性检索。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- zipped_prompt
    - 返回一个元组列表，每个元组包含从指定提示中提取的正面和负面文本，以及文件名。这种被称为"zipped_prompt"的结构化输出可供进一步处理。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: List[Tuple[str, str, str]]


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
