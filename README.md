# The Maternal Health Gap: U.S. vs. the World

[![DOI](https://zenodo.org/badge/1433245671.svg)](https://doi.org/10.5281/zenodo.23643141)

An interactive dashboard comparing U.S. maternal health outcomes with high-income peer nations across four views: maternal mortality (including the racial gap within the U.S.), when pregnancy-related deaths occur, paid maternity leave policy, and the maternity care workforce.

**Live:** https://maternal-health.samira-ray.dev

Originally created for DSC/330, Data Communication and Visualization for Business.

## Built with
Hand-coded HTML, CSS and JavaScript with [Chart.js](https://www.chartjs.org/) 4.4.1. No BI tool or build step. Light and dark themes, animated KPI cards, responsive layout.

## Design choices
- Styled in the Aristeia Labs palette: hydrangea blue, clay, gold and deep-brown ink on blue-white paper, with Instrument Serif headlines and Hanken Grotesk text.
- Clay is used only for U.S. data, so the U.S. stands out in every chart before you read a label. Gold marks reference lines.
- Every chart has its source linked directly underneath it.
- Peer-country averages are calculated from the countries shown in each chart.

## Files
| File | Purpose |
|---|---|
| `index.html` | Page layout, text and sources |
| `data.js` | All figures, with their source and year |
| `app.js` | Charts, theme toggle, KPI animation |
| `base.css`, `style.css` | Styles and theme colors |

## Data sources
Agency for Healthcare Research and Quality (2023); CDC/NCHS (2026); Gunja et al., The Commonwealth Fund (2024); OECD Family Database PF2.1 (2025); Tikkanen et al., The Commonwealth Fund (2020); WHO (2025). Full APA citations are in the page footer.

## Changelog
**v1.1.0: Aristeia Labs branding**
- New palette and type in light and dark themes; U.S. subgroups drawn in a lighter clay so the U.S. overall bar leads.
- Midwives and the OECD reference line moved to gold, so clay is reserved for the U.S.

**v1.0.0: October 2026 review**
- Recalculated peer averages from the charted data: mortality 4.9 (was 5.3), so the U.S. is 4.5× the average and Black mothers 10.1×; workforce 52.5 (was 57).
- Corrected the paid-leave text: most peers fall below the 18.4-week OECD average, but every one guarantees some paid leave.
- Softened the story summary to what the data supports and removed an uncited claim about healthcare spending.
- Sorted the mortality chart strictly lowest to highest; used "live births" and "OB-GYNs" consistently.
- Labeled data years (2017–2025) and noted why 2022 is used for international mortality comparisons.
- Pinned Chart.js to 4.4.1.

## License
Code is released under the [MIT License](LICENSE). Figures belong to their original sources (listed above); please cite those sources when reusing the data.

## How to cite
Ray, S. (2026). *The Maternal Health Gap: U.S. vs. the World* (Version 1.0.0) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.23643141

Or use **Cite this repository** on GitHub, which reads [`CITATION.cff`](CITATION.cff).

## Author
**Samira Ray** · [ORCID 0009-0006-6885-8400](https://orcid.org/0009-0006-6885-8400) · [samira-ray.dev](https://samira-ray.dev) · [GitHub](https://github.com/Rei0322)
