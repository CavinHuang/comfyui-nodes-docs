
# Documentation
- Class name: LLMImageTabularChartReader
- Category: SALT/Language Toolkit/Readers
- Output node: False

LLMImageTabularChartReader节点专门用于将基于图像的图表解读为表格数据，将视觉信息转换为结构化文档格式。这一过程能够从代表图表的图像中提取和分析数据，便于将其整合到数据处理工作流程中。

# Input types
## Required
- path
    - 指定需要读取的图像图表的文件路径。这对于定位和访问图像以进行数据提取至关重要。
    - Comfy dtype: STRING
    - Python dtype: str

## Optional
- max_output_tokens
    - 确定输出生成的最大标记数，影响提取数据的详细程度和长度。
    - Comfy dtype: INT
    - Python dtype: int
- prompt
    - 提供可选的文本提示，用于指导图像图表的解释，可能影响提取数据的重点或上下文。
    - Comfy dtype: STRING
    - Python dtype: str
- extra_info
    - 允许以字符串格式包含额外信息，可用于传递数据提取过程的额外参数或上下文。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- documents
    - 以结构化文档格式返回从图像图表中提取的表格数据，便于进一步分析或处理。
    - Comfy dtype: DOCUMENT
    - Python dtype: Document


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class LLMImageTabularChartReader(ImageTabularChartReader):
    """
    @NOTE: Reads an Image chart as if it were tabular data into a llama_index Document
    @Source: https://github.com/run-llama/llama_index/blob/main/llama-index-integrations/readers/llama-index-readers-file/llama_index/readers/file/image_deplot/base.py
    @Documentation: https://docs.llamaindex.ai/en/latest/api_reference/readers/file/#llama_index.readers.file.ImageTabularChartReader
    """

    def __init__(self):
        super().__init__()

    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": {
                "path": ("STRING", {"default": ""}),
            },
            "optional": {
    #			"keep_image": ([False, True], {"default": False}),
                "max_output_tokens": ("INT", {"default": 512}),
                "prompt": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": ""}),
                "extra_info": ("STRING", {"multiline": True, "dynamicPrompts": False, "default": "{}"}),
            }
        }

    RETURN_TYPES = ("DOCUMENT", )
    RETURN_NAMES = ("documents",)

    FUNCTION = "execute"
    CATEGORY = f"{MENU_NAME}/{SUB_MENU_NAME}/Readers"

    def execute(self, path:str, max_output_tokens:int=512, prompt:str=None, extra_info:str="{}"):
        get_full_path(1, path)
        if not os.path.exists(path):
            raise FileNotFoundError(f"No file available at: {path}")
        path = Path(path)
        self._max_output_tokens = max_output_tokens
        if prompt and len(prompt) > 2:
            self._prompt = prompt
        extra_info = read_extra_info(extra_info)
        data = self.load_data(path, extra_info)
        return (data, )

```
