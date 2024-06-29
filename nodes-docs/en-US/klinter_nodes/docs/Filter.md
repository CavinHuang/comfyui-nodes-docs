---
tags:
- VisualEffects
---

# Filter (Klinter)
## Documentation
- Class name: `Filter`
- Category: `klinter`
- Output node: `False`

The Filter node is designed to selectively process data based on specific criteria, allowing for the refinement and extraction of relevant information from a dataset. It focuses on evaluating and filtering input data to meet defined conditions, thereby enabling targeted data analysis and manipulation.
## Input types
### Required
- **`in_question`**
    - Serves as the primary query or condition for filtering, determining the focus of data processing.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
- **`wordlist`**
    - A list of words or terms used as criteria for filtering the data, aiding in the refinement of results.
    - Comfy dtype: `STRING`
    - Python dtype: `List[str]`
- **`safeword`**
    - A specific term or flag that ensures certain data is preserved or excluded from filtering, enhancing control over the output.
    - Comfy dtype: `STRING`
    - Python dtype: `str`
## Output types
- **`string`**
    - Comfy dtype: `STRING`
    - The result of the filtering process, typically a subset of the input data that meets the defined criteria.
    - Python dtype: `str`
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
