
# Documentation
- Class name: LLMDirectoryReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMDirectoryReader节点旨在读取和处理目录，高效地处理和组织内容，并将其转化为适合进一步分析或处理的结构化格式。它抽象了目录遍历和内容提取的复杂性，使处理大量文件或嵌套目录结构变得更加容易。

# Input types
## Required
- input_directory
    - 指定要读取的目录路径，作为节点进行目录遍历和内容提取操作的起点。该参数对于定义读取过程的范围至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- optional_path_list
    - 目录内特定路径的列表，用于聚焦处理。这可以将读取过程精细化到特定文件或子目录，从而可能优化输出的性能和相关性。
    - Comfy dtype: *
    - Python dtype: list
- recursive
    - 布尔标志，用于确定读取操作是否应递归遍历子目录。启用此功能可能会显著影响目录读取过程的深度和全面性。
    - Comfy dtype: BOOLEAN
    - Python dtype: bool
- required_ext_list
    - 定义要包含在读取过程中的文件扩展名列表。这会过滤要处理的文件，通过将输出限制为指定类型的文件，直接影响节点的输出。
    - Comfy dtype: STRING
    - Python dtype: str
- exclude_glob_list
    - 指定要从读取过程中排除的模式。这可以防止处理某些文件或目录，从而定制输出以排除不相关或敏感信息。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 返回从目录读取的内容的结构化表示，通常以便于进一步分析或处理的方式组织。
    - Comfy dtype: DOCUMENT
    - Python dtype: list


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMDirectoryReader:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "input_directory": ("STRING", {}),
            },
            "optional": {
                "optional_path_list": (WILDCARD, {}),
                "recursive": ("BOOLEAN", {"default": False}),
                "required_ext_list": ("STRING", {"default": ".json, .txt, .html"}),
                "exclude_glob_list": ("STRING", {"default": ".sqlite, .zip"}),
            },
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "read_directory"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def read_directory(self, input_directory, optional_path_list=[], recursive=False, required_ext_list=None, exclude_glob_list=None):

        if required_ext_list.strip():
            required_exts = [ext.strip() for ext in required_ext_list.split(",") if ext.strip()]
        else:
            required_exts = None

        if exclude_glob_list.strip():
            exclude = [pattern.strip() for pattern in exclude_glob_list.split(",") if pattern.strip()]
        else:
            exclude = None

        print("Excluding: ", exclude)
        print("Required Extensions: ", required_exts)

        if not optional_path_list:
            full_path = get_full_path(1, input_directory.strip())
            input_dir = full_path if os.path.isdir(full_path) else None
            if not input_dir:
                raise ValueError("The provided subdirectory does not exist.")

            reader = SimpleDirectoryReader(
                input_dir=input_dir,
                exclude_hidden=True,
                recursive=recursive,
                required_exts=required_exts,
                exclude=exclude
            )
        elif optional_path_list and isinstance(optional_path_list, (str, list)):

            if isinstance(optional_path_list, str):
                path_list = [optional_path_list]
            else:
                path_list = []
                for path in optional_path_list:
                    if os.path.isfile(path): # and path.startswith(folder_paths.get_input_directory()):
                        path_list.append(path)

            reader = SimpleDirectoryReader(
                input_files=path_list,
            )


        documents = reader.load_data()
        if not documents:
            raise ValueError("No documents found in the specified directory.")

        return (documents,)

```
