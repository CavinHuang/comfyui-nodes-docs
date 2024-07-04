
# Documentation
- Class name: Filter
- Category: klinter
- Output node: False

Filter节点专门设计用于根据特定标准选择性地处理数据，能够从数据集中提取和精炼相关信息。它主要聚焦于评估和筛选输入数据以满足预定条件，从而实现有针对性的数据分析和操作。

# Input types
## Required
- in_question
    - 作为过滤的主要查询或条件，决定了数据处理的重点。
    - Comfy dtype: STRING
    - Python dtype: str
- wordlist
    - 一个用作过滤数据标准的词语或术语列表，有助于细化结果。
    - Comfy dtype: STRING
    - Python dtype: List[str]
- safeword
    - 一个特定的术语或标志，用于确保某些数据在过滤过程中被保留或排除，增强了对输出的控制。
    - Comfy dtype: STRING
    - Python dtype: str

# Output types
- string
    - 过滤过程的结果，通常是符合定义标准的输入数据子集。
    - Comfy dtype: STRING
    - Python dtype: str


## Usage tips
- Infra type: `CPU`
- Common nodes: unknown


## Source code
```python
class Filter:
    """Class for checking if a given string appears in a list of strings and returning a filter word if true."""

    @classmethod
    def INPUT_TYPES(cls):
        """Defines the input types for the operation."""
        return {
            "required": {
                "in_question": ("STRING", {"forceInput": True, "default": "", "multiline": False}),
                "wordlist": ("STRING", {"forceInput": True, "default": "", "multiline": True}),
                "safeword": ("STRING", {"forceInput": True, "default": "", "multiline": True}),
            }
        }

    RETURN_TYPES = ("STRING",)
    FUNCTION = "Filter"
    CATEGORY = "klinter"

    def Filter(self, in_question, wordlist, safeword):
        """
        Checks if 'in_question' exists within 'wordlist'. If it does, returns 'safeword',
        otherwise returns 'in_question'.
        
        Args:
            in_question (str): The string to search for.
            wordlist (str): A string containing a list of words, assumed to be space-separated.
            safeword (str): The word to return if 'in_question' is found in 'wordlist'.
        
        Returns:
            str: 'safeword' if 'in_question' is found in 'wordlist', else 'in_question'.
        """
        # Convert the 'wordlist' string into a list of words
        words = wordlist.split()
        
        # Check if 'in_question' is in the list of words
        if in_question in words:
            return (safeword,)
        else:
            return (in_question,)

```
