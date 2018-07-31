
import { expect } from 'chai';
import * as helper from '../src/utils/helper';


describe('Utils test', () => {
  describe('matchArray test', () => {
    it('Should match array successfully', () => {
      const arrA = [{ index: 0 }, { index: 1 }, { index: 2 }];
      const arrB = [{ index: 0 }, { index: 1 }, { index: 2 }];
      expect(helper.matchArray(arrA, arrB, 'index')).to.equal(true);
    });

    it('Should match array failed', () => {
      const arrA = [{ index: 0 }, { index: 1 }, { index: 2 }];
      const arrB = [{ index: 0 }, { index: 1 }, { index: 2 }];
      arrB[0].index = -1;
      expect(helper.matchArray(arrA, arrB, 'index')).to.equal(false);
    });

    it('Should match array failed', () => {
      const arrA = [{ index: 0 }, { index: 1 }, { index: 2 }];
      const arrB = [{ index: 0 }, { index: 1 }, { index: 2 }];
      arrB.pop();
      expect(helper.matchArray(arrA, arrB, 'index')).to.equal(false);
    });
  });

  describe('timesCreator test', () => {
    it('Should directly return with times given', () => {
      const times = helper.timesCreator({
        times: [1, 2, 3, 4],
        from: 1,
        to: 4,
        length: 4
      });
      expect(times).to.deep.equal([1, 2, 3, 4]);
    });

    it('Should create times with length given', () => {
      const times = helper.timesCreator({
        from: 1,
        to: 4,
        length: 4
      });
      expect(times).to.deep.equal([1, 2, 3, 4]);
    });

    it('Should create times with length and step given', () => {
      const times = helper.timesCreator({
        from: 1,
        to: 4,
        step: 2,
        length: 4
      });
      expect(times).to.deep.equal([1, 3, 5, 7]);
    });

    it('Should create times with from & to', () => {
      const times = helper.timesCreator({
        from: 1,
        to: 4,
      });
      expect(times).to.deep.equal([1, 2, 3, 4]);
    });

    it('Should create times with from & to & step', () => {
      const times = helper.timesCreator({
        from: 1,
        to: 4,
        step: 2
      });
      expect(times).to.deep.equal([1, 3]);
    });
  });
});
