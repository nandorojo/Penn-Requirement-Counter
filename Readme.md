# doubleCounter

doubleCounter helps Penn students in the School of Arts and Sciences find classes that double count requirements.

# docs

Each course has a `data-sector` and `data-foundational` attribute. 
 
The first attribute shown is a sector, and the second is a foundational.

When selecting a button, each with the class `.requirement`, you filter the courses by requirement. Each `.requirement` has a `data-requirement-filter` attribute that indicates which requirement types should be shown.

The parent `<div>` for each list has a `data-requirement-type` attribute.

## The process
Here's how it works. 

When a `.requirement` button is clicked, the `.active` class is toggled for this button and removed from other requirements of the same type. 

Then, the `data-requirement` attribute is extracted from the active `.requirement` as a search term – either for the sector or foundational.

There is a function called `filterCourses()` that takes two arguments: `sector`, `foundational`. 

## Sectors
| Sector | `data-sector` |
| -------| -------      |
| Society | `society` |
| History and Tradition | `history-tradition` |
| Arts and Letters | `arts-letters` |
| Humanities and Social Science | `humanities-soc` |
| Living World | `living-world` |
| Physical World | `physical-world` |
| Natural Sciences and Mathematics  | `natural-sciences` |

## Foundational Approaches
| Foundational | `data-foundational` |
| -------| -------      |
| Quantitative Data Analysis | `quant-data` |
| Formal Reasoning & Analysis | `formal-reasoning` |
| Cross Cultural Analysis | `cross-cult` |
| Cultural Diversity in the U.S. | `cultural-div` |
| Living World | `living-world` |
| Writing | `writing` |
| Language  | `language` |

