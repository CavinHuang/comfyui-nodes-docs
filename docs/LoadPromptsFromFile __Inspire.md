
# Documentation
- Class name: LoadPromptsFromFile __Inspire
- Category: InspirePack/Prompt
- Output node: False

LoadPromptsFromFile节点旨在从指定文件读取并解析提示数据，基于预定义的模式提取结构化信息。它的目标是通过为正面和负面提示组件提供结构化格式，来促进文本提示的生成或操作。

# Input types
## Required
- prompt_file
    - 指定要加载提示的文件，作为确定处理提示数据来源的关键输入。
    - Comfy dtype: COMBO[STRING]
    - Python dtype: str

# Output types
- zipped_prompt
    - 返回一个元组列表，每个元组包含正面文本、负面文本和加载提示的文件名，代表从文件中提取的结构化提示数据。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: List[Tuple[str, str, str]]


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
