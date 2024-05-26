# Documentation
- Class name: LoadSinglePromptFromFile
- Category: InspirePack/Prompt
- Output node: False
- Repo Ref: https://github.com/ltdrdata/ComfyUI-Inspire-Pack.git

该节点旨在从指定文件中提取和处理文本提示，使用户能够在系统中以结构化的方式利用预定义的提示。

# Input types
## Required
- prompt_file
    - prompt_file 参数至关重要，因为它标识了将从中加载提示的特定文本文件。它通过确定提示的来源影响节点的操作。
    - Comfy dtype: COMBO[prompt_files]
    - Python dtype: str
## Optional
- index
    - index 参数很重要，因为它指定了文件中所需提示的位置。它通过选择特定的提示进行处理来影响节点的执行。
    - Comfy dtype: INT
    - Python dtype: int

# Output types
- zipped_prompt
    - 输出提供了一个包含提示的正面和负面方面的元组，以及文件名，这对于系统内的进一步分析和应用至关重要。
    - Comfy dtype: ZIPPED_PROMPT
    - Python dtype: Tuple[str, str, str]

# Usage tips
- Infra type: CPU

# Source code
```
class LoadSinglePromptFromFile:

    @classmethod
    def INPUT_TYPES(cls):
        global prompts_path
        try:
            prompt_files = []
            for (root, dirs, files) in os.walk(prompts_path):
                for file in files:
                    if file.endswith('.txt'):
                        file_path = os.path.join(root, file)
                        rel_path = os.path.relpath(file_path, prompts_path)
                        prompt_files.append(rel_path)
        except Exception:
            prompt_files = []
        return {'required': {'prompt_file': (prompt_files,), 'index': ('INT', {'default': 0, 'min': 0, 'max': 18446744073709551615})}}
    RETURN_TYPES = ('ZIPPED_PROMPT',)
    OUTPUT_IS_LIST = (True,)
    FUNCTION = 'doit'
    CATEGORY = 'InspirePack/Prompt'

    def doit(self, prompt_file, index):
        prompt_path = os.path.join(prompts_path, prompt_file)
        prompts = []
        try:
            with open(prompt_path, 'r', encoding='utf-8') as file:
                prompt_data = file.read()
                prompt_list = re.split('\\n\\s*-+\\s*\\n', prompt_data)
                try:
                    prompt = prompt_list[index]
                except Exception:
                    prompt = prompt_list[-1]
                pattern = 'positive:(.*?)(?:\\n*|$)negative:(.*)'
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
        return (prompts,)
```